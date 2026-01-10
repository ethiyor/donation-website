const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const stripe = require('stripe');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Stripe webhook route needs raw body
app.post('/api/webhook', express.raw({ type: 'application/json' }), require('./routes/webhook'));

// Regular JSON parsing for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/donations', require('./routes/donations'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stats', require('./routes/stats'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

module.exports = app;
