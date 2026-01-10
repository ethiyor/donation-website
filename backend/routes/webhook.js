const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { query } = require('../config/database');
const { sendDonationEmail } = require('../utils/email');

// Stripe webhook handler
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('Payment successful:', session.id);
      
      try {
        // Update donation status
        const result = await query(
          `UPDATE donors 
           SET payment_status = 'succeeded', 
               stripe_payment_id = $1
           WHERE stripe_session_id = $2
           RETURNING *`,
          [session.payment_intent, session.id]
        );
        
        if (result.rows.length > 0) {
          const donation = result.rows[0];
          console.log('Donation updated:', donation.id);
          
          // Send confirmation email
          await sendDonationEmail(donation);
        }
      } catch (error) {
        console.error('Error updating donation:', error);
      }
      break;
    }
    
    case 'checkout.session.expired': {
      const session = event.data.object;
      console.log('Session expired:', session.id);
      
      await query(
        `UPDATE donors 
         SET payment_status = 'failed'
         WHERE stripe_session_id = $1`,
        [session.id]
      );
      break;
    }
    
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.log('Payment failed:', paymentIntent.id);
      
      await query(
        `UPDATE donors 
         SET payment_status = 'failed'
         WHERE stripe_payment_id = $1`,
        [paymentIntent.id]
      );
      break;
    }
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

module.exports = handleWebhook;
