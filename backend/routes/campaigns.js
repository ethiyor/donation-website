const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { body, validationResult } = require('express-validator');

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const { category, is_active = 'true', limit = 20, offset = 0 } = req.query;
    
    let queryText = `
      SELECT c.*, 
             COALESCE(COUNT(DISTINCT d.id) FILTER (WHERE d.payment_status = 'succeeded'), 0) as donor_count,
             ROUND((c.raised_amount / NULLIF(c.goal_amount, 0) * 100)::numeric, 2) as progress_percentage
      FROM campaigns c
      LEFT JOIN donors d ON c.id = d.campaign_id
      WHERE 1=1
    `;
    const queryParams = [];
    
    if (is_active !== 'all') {
      queryParams.push(is_active === 'true');
      queryText += ` AND c.is_active = $${queryParams.length}`;
    }
    
    if (category) {
      queryParams.push(category);
      queryText += ` AND c.category = $${queryParams.length}`;
    }
    
    queryText += `
      GROUP BY c.id
      ORDER BY c.created_at DESC
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `;
    queryParams.push(limit, offset);
    
    const result = await query(queryText, queryParams);
    
    res.json({
      campaigns: result.rows,
      count: result.rows.length,
      offset: parseInt(offset),
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// Get single campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      `SELECT c.*, 
              COALESCE(COUNT(DISTINCT d.id) FILTER (WHERE d.payment_status = 'succeeded'), 0) as donor_count,
              ROUND((c.raised_amount / NULLIF(c.goal_amount, 0) * 100)::numeric, 2) as progress_percentage
       FROM campaigns c
       LEFT JOIN donors d ON c.id = d.campaign_id
       WHERE c.id = $1
       GROUP BY c.id`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

// Create new campaign (admin only - add auth middleware later)
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('goal_amount').isFloat({ min: 1 }).withMessage('Goal must be at least $1'),
  body('category').optional().trim(),
  body('image_url').optional().isURL().withMessage('Must be valid URL'),
  body('end_date').optional().isISO8601().withMessage('Must be valid date')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, goal_amount, category, image_url, end_date } = req.body;
    
    const result = await query(
      `INSERT INTO campaigns (title, description, goal_amount, category, image_url, end_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, goal_amount, category || null, image_url || null, end_date || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// Update campaign
router.put('/:id', [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('goal_amount').optional().isFloat({ min: 0 }),
  body('is_active').optional().isBoolean()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updates = req.body;
    
    const fields = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [id, ...Object.values(updates)];
    
    const result = await query(
      `UPDATE campaigns 
       SET ${fields}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1 
       RETURNING *`,
      values
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
});

// Get campaign categories
router.get('/meta/categories', async (req, res) => {
  try {
    const result = await query(
      `SELECT DISTINCT category, COUNT(*) as count
       FROM campaigns
       WHERE category IS NOT NULL AND is_active = true
       GROUP BY category
       ORDER BY count DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
