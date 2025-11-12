const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get overall statistics
router.get('/', async (req, res) => {
  try {
    const stats = await query(`
      SELECT 
        COALESCE(SUM(amount), 0) as total_raised,
        COUNT(DISTINCT id) as total_donations,
        COUNT(DISTINCT email) as unique_donors,
        COALESCE(AVG(amount), 0) as average_donation
      FROM donors
      WHERE payment_status = 'succeeded'
    `);
    
    const campaigns = await query(`
      SELECT 
        COUNT(*) as total_campaigns,
        COUNT(*) FILTER (WHERE is_active = true) as active_campaigns,
        COALESCE(SUM(goal_amount), 0) as total_goals,
        COALESCE(SUM(raised_amount), 0) as total_raised_campaigns
      FROM campaigns
    `);
    
    const recentDonations = await query(`
      SELECT 
        CASE WHEN is_anonymous THEN 'Anonymous' ELSE name END as name,
        amount,
        created_at
      FROM donors
      WHERE payment_status = 'succeeded'
      ORDER BY created_at DESC
      LIMIT 10
    `);
    
    res.json({
      overall: stats.rows[0],
      campaigns: campaigns.rows[0],
      recent_donations: recentDonations.rows
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get donation trends (by day/month)
router.get('/trends', async (req, res) => {
  try {
    const { period = 'day', limit = 30 } = req.query;
    
    const dateFormat = period === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD';
    
    const result = await query(`
      SELECT 
        TO_CHAR(created_at, $1) as period,
        COUNT(*) as donation_count,
        COALESCE(SUM(amount), 0) as total_amount
      FROM donors
      WHERE payment_status = 'succeeded'
      GROUP BY period
      ORDER BY period DESC
      LIMIT $2
    `, [dateFormat, limit]);
    
    res.json(result.rows.reverse());
  } catch (error) {
    console.error('Error fetching trends:', error);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
});

module.exports = router;
