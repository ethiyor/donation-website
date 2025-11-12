# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm run install-all
```

### Step 2: Set Up Database
```bash
# Create database
createdb donation_db

# Import schema
psql donation_db < backend/database/schema.sql
```

### Step 3: Configure Environment

Copy `.env.example` files and fill in your credentials:

**backend/.env:**
- Add your Stripe keys (get from https://stripe.com/test)
- Add database URL
- Configure email settings

**frontend/.env:**
- Add Stripe publishable key

### Step 4: Start Development
```bash
npm run dev
```

Visit http://localhost:5173 🎉

## 📝 Get Stripe Test Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy **Publishable key** → `frontend/.env`
3. Copy **Secret key** → `backend/.env`
4. For webhooks: https://dashboard.stripe.com/test/webhooks

## ✉️ Email Setup (Gmail)

1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use in `backend/.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

## 🎨 Customization

### Change Colors
Edit `frontend/src/index.css`:
```css
:root {
  --primary-color: #667eea;  /* Your brand color */
  --secondary-color: #764ba2;
}
```

### Add Campaign
Use PostgreSQL or the API:
```sql
INSERT INTO campaigns (title, description, goal_amount, category, image_url)
VALUES ('Your Campaign', 'Description', 10000, 'Education', 'image-url');
```

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change port in backend/.env
PORT=5001
```

**Database connection failed?**
```bash
# Check if PostgreSQL is running
pg_isready

# Restart PostgreSQL (macOS)
brew services restart postgresql
```

**Stripe webhook not working?**
Use Stripe CLI for local testing:
```bash
stripe listen --forward-to localhost:5000/api/webhook
```

## 📚 Next Steps

- [ ] Customize branding and colors
- [ ] Add your own campaigns
- [ ] Test donation flow with Stripe test cards
- [ ] Configure email templates
- [ ] Deploy to production

Need help? Check the main README.md for full documentation!
