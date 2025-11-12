# 💙 Modern Donation Website

A full-stack donation platform built with React, Express, PostgreSQL, and Stripe. Support charitable causes with secure online donations, campaign tracking, and real-time progress updates.

![Donation Website](https://img.shields.io/badge/Status-Ready-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)

## ✨ Features

### 🎯 Core Features
- **Secure Payment Processing** - Stripe integration for safe, encrypted transactions
- **Campaign Management** - Create and manage fundraising campaigns
- **Real-time Progress** - Live donation tracking with progress bars
- **Donor Dashboard** - View donation history and receipts
- **Email Confirmations** - Automated receipts via Nodemailer
- **Anonymous Donations** - Option to donate anonymously
- **Leaderboard** - Recognize top donors
- **Multi-category Support** - Filter campaigns by category

### 🔒 Security
- HTTPS/SSL encryption
- Stripe webhook verification
- Input validation & sanitization
- Secure authentication with JWT
- Password hashing with bcrypt

### 📱 User Experience
- Responsive design (mobile & desktop)
- Modern gradient UI
- Smooth animations
- Toast notifications
- Loading states

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool & dev server
- **Stripe.js** - Payment integration
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Icons** - Icon library

### Backend
- **Node.js & Express** - Server framework
- **PostgreSQL** - Database
- **Stripe** - Payment processing
- **Nodemailer** - Email service
- **JWT** - Authentication
- **Helmet** - Security headers
- **Express Validator** - Input validation

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Stripe account (test mode keys)
- Email service (Gmail, SendGrid, etc.)

### 1. Clone or Navigate to Project
```bash
cd donation-website
```

### 2. Install Dependencies
```bash
npm run install-all
```

Or install manually:
```bash
# Root dependencies
npm install

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Database Setup

Create a PostgreSQL database:
```bash
createdb donation_db
```

Run the schema:
```bash
psql donation_db < backend/database/schema.sql
```

Or use a hosted database (Supabase, Neon, etc.)

### 4. Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/donation_db

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@donationsite.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 5. Start Development Servers

**Option 1 - Both at once:**
```bash
npm run dev
```

**Option 2 - Separate terminals:**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Deploy to Vercel:**
```bash
npx vercel deploy
```

3. **Set environment variables** in Vercel dashboard

### Backend (Render/Railway)

1. **Push to GitHub**

2. **Connect to Render/Railway**

3. **Set environment variables**

4. **Configure build command:**
```bash
cd backend && npm install
```

5. **Start command:**
```bash
cd backend && npm start
```

### Database (Supabase/Neon)

1. Create a PostgreSQL database
2. Run the schema from `backend/database/schema.sql`
3. Update `DATABASE_URL` in production environment

### Stripe Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-backend-url.com/api/webhook`
3. Select events: `checkout.session.completed`, `checkout.session.expired`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## 📚 API Documentation

### Campaigns

```
GET    /api/campaigns           - Get all campaigns
GET    /api/campaigns/:id       - Get single campaign
POST   /api/campaigns           - Create campaign (admin)
PUT    /api/campaigns/:id       - Update campaign (admin)
GET    /api/campaigns/meta/categories - Get all categories
```

### Donations

```
GET    /api/donations           - Get all donations
POST   /api/donations/create-checkout-session - Create Stripe session
GET    /api/donations/:id       - Get donation by ID
GET    /api/donations/leaderboard/top - Get top donors
```

### Statistics

```
GET    /api/stats               - Get overall statistics
GET    /api/stats/trends        - Get donation trends
```

### Authentication

```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
```

## 🗂️ Project Structure

```
donation-website/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── utils/          # API & helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/             # Database config
│   ├── database/           # SQL schema
│   ├── routes/             # API routes
│   ├── utils/              # Email, helpers
│   ├── server.js
│   └── package.json
│
├── package.json            # Root package (dev scripts)
└── README.md
```

## 🧪 Testing

### Test Stripe Payments

Use Stripe test cards:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- Any future expiry date, any CVC

### Test Email

Use a service like Ethereal Email or Mailtrap for development

## 🔧 Common Issues

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### Stripe Error
- Verify API keys are correct
- Check if keys match environment (test vs live)
- Ensure webhook secret is set

### Email Not Sending
- Check SMTP credentials
- For Gmail, use App Password
- Verify EMAIL_HOST and EMAIL_PORT

## 📈 Future Enhancements

- [ ] Recurring donations (subscriptions)
- [ ] Social media authentication
- [ ] Admin dashboard with analytics
- [ ] Multilingual support
- [ ] Dark mode
- [ ] Campaign image uploads
- [ ] CSV export for donations
- [ ] Advanced filtering & search
- [ ] Campaign comments/updates
- [ ] Integration with payment processors (PayPal, etc.)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 💬 Support

For questions or issues:
- Email: support@donatenow.com
- GitHub Issues: [Create Issue](https://github.com/yourrepo/issues)

---

**Built with ❤️ for a better world**
