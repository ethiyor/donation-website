-- Donation Website Database Schema
-- PostgreSQL / Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    goal_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    raised_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    image_url VARCHAR(500),
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    CONSTRAINT goal_positive CHECK (goal_amount >= 0),
    CONSTRAINT raised_positive CHECK (raised_amount >= 0)
);

-- Donors Table
CREATE TABLE IF NOT EXISTS donors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    payment_status VARCHAR(50) DEFAULT 'pending',
    stripe_payment_id VARCHAR(255),
    stripe_session_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT amount_positive CHECK (amount > 0)
);

-- Users Table (for authentication - optional)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_donors_campaign ON donors(campaign_id);
CREATE INDEX idx_donors_email ON donors(email);
CREATE INDEX idx_donors_created ON donors(created_at DESC);
CREATE INDEX idx_campaigns_active ON campaigns(is_active);
CREATE INDEX idx_campaigns_created ON campaigns(created_at DESC);
CREATE INDEX idx_users_email ON users(email);

-- Function to update raised_amount automatically
CREATE OR REPLACE FUNCTION update_campaign_raised_amount()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payment_status = 'succeeded' THEN
        UPDATE campaigns
        SET raised_amount = raised_amount + NEW.amount,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.campaign_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update campaign when donation is successful
CREATE TRIGGER trigger_update_raised_amount
AFTER INSERT OR UPDATE OF payment_status ON donors
FOR EACH ROW
EXECUTE FUNCTION update_campaign_raised_amount();

-- Insert sample campaigns
INSERT INTO campaigns (title, description, goal_amount, image_url, category) VALUES
('Clean Water Initiative', 'Provide clean drinking water to communities in need across rural areas.', 50000.00, 'https://images.unsplash.com/photo-1583487757863-c2f0e8c0b46e', 'Health'),
('Education for All', 'Support education programs for underprivileged children worldwide.', 100000.00, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b', 'Education'),
('Disaster Relief Fund', 'Emergency response and support for communities affected by natural disasters.', 75000.00, 'https://images.unsplash.com/photo-1593113598332-cd288d649433', 'Emergency'),
('Medical Equipment', 'Purchase essential medical equipment for local hospitals and clinics.', 30000.00, 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf', 'Healthcare');

-- View for campaign statistics
CREATE OR REPLACE VIEW campaign_stats AS
SELECT 
    c.id,
    c.title,
    c.goal_amount,
    c.raised_amount,
    ROUND((c.raised_amount / NULLIF(c.goal_amount, 0) * 100)::numeric, 2) as progress_percentage,
    COUNT(d.id) as donor_count,
    MAX(d.created_at) as last_donation_date
FROM campaigns c
LEFT JOIN donors d ON c.id = d.campaign_id AND d.payment_status = 'succeeded'
GROUP BY c.id, c.title, c.goal_amount, c.raised_amount;
