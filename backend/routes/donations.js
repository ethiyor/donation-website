const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { query } = require('../config/database');
const { body, validationResult } = require('express-validator');
const { sendDonationEmail } = require('../utils/email');

// Get all donations (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { campaign_id, limit = 50, offset = 0 } = req.query;
    
    let queryText = `
      SELECT d.*, c.title as campaign_title
      FROM donors d
      LEFT JOIN campaigns c ON d.campaign_id = c.id
      WHERE d.payment_status = 'succeeded'
    `;
    const queryParams = [];
    
    if (campaign_id) {
      queryParams.push(campaign_id);
      queryText += ` AND d.campaign_id = $${queryParams.length}`;
    }
    
    queryText += ` ORDER BY d.created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(limit, offset);
    
    const result = await query(queryText, queryParams);
    
    // Hide email for anonymous donations
    const donations = result.rows.map(donation => ({
      ...donation,
      email: donation.is_anonymous ? null : donation.email,
      name: donation.is_anonymous ? 'Anonymous' : donation.name
    }));
    
    res.json({
      donations,
      count: donations.length,
      offset: parseInt(offset),
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Create donation checkout session
router.post('/create-checkout-session', [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least $1'),
  body('campaign_id').optional().isUUID().withMessage('Invalid campaign ID'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('is_anonymous').optional().isBoolean()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { amount, campaign_id, name, email, message, is_anonymous } = req.body;
    
    // Verify campaign exists if provided
    if (campaign_id) {
      const campaignResult = await query(
        'SELECT * FROM campaigns WHERE id = $1 AND is_active = true',
        [campaign_id]
      );
      
      if (campaignResult.rows.length === 0) {
        return res.status(404).json({ error: 'Campaign not found or inactive' });
      }
    }
    
    // Create pending donation record
    const donationResult = await query(
      `INSERT INTO donors (campaign_id, name, email, amount, message, is_anonymous, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING id`,
      [campaign_id || null, name, email, amount, message || null, is_anonymous || false]
    );
    
    const donationId = donationResult.rows[0].id;
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: campaign_id ? 'Campaign Donation' : 'General Donation',
            description: message || 'Thank you for your generous donation!'
          },
          unit_amount: Math.round(amount * 100) // Convert to cents
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: email,
      metadata: {
        donation_id: donationId,
        campaign_id: campaign_id || 'general',
        donor_name: name
      }
    });
    
    // Update donation with session ID
    await query(
      'UPDATE donors SET stripe_session_id = $1 WHERE id = $2',
      [session.id, donationId]
    );
    
    res.json({ 
      sessionId: session.id,
      url: session.url,
      donationId 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Get donation by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      `SELECT d.*, c.title as campaign_title
       FROM donors d
       LEFT JOIN campaigns c ON d.campaign_id = c.id
       WHERE d.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
});

// Get leaderboard (top donors)
router.get('/leaderboard/top', async (req, res) => {
  try {
    const { limit = 10, campaign_id } = req.query;
    
    let queryText = `
      SELECT 
        CASE WHEN is_anonymous THEN 'Anonymous' ELSE name END as name,
        SUM(amount) as total_amount,
        COUNT(*) as donation_count,
        MAX(created_at) as last_donation
      FROM donors
      WHERE payment_status = 'succeeded'
    `;
    const queryParams = [];
    
    if (campaign_id) {
      queryParams.push(campaign_id);
      queryText += ` AND campaign_id = $${queryParams.length}`;
    }
    
    queryText += `
      GROUP BY name, is_anonymous
      ORDER BY total_amount DESC
      LIMIT $${queryParams.length + 1}
    `;
    queryParams.push(limit);
    
    const result = await query(queryText, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
