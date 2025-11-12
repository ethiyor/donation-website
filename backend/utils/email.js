const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send donation confirmation email
const sendDonationEmail = async (donation) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: donation.email,
      subject: '🙏 Thank You for Your Donation!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                     color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .amount { font-size: 36px; font-weight: bold; color: #667eea; margin: 20px 0; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You! 💙</h1>
              <p>Your generosity makes a difference</p>
            </div>
            <div class="content">
              <p>Dear ${donation.name},</p>
              <p>Thank you for your generous donation! Your support helps us continue our mission to make a positive impact.</p>
              
              <div class="amount">$${parseFloat(donation.amount).toFixed(2)}</div>
              
              <div class="details">
                <h3>Donation Details</h3>
                <p><strong>Amount:</strong> $${parseFloat(donation.amount).toFixed(2)}</p>
                <p><strong>Date:</strong> ${new Date(donation.created_at).toLocaleDateString()}</p>
                <p><strong>Transaction ID:</strong> ${donation.id}</p>
                ${donation.message ? `<p><strong>Message:</strong> ${donation.message}</p>` : ''}
              </div>
              
              <p>Your donation is tax-deductible. Please keep this email for your records.</p>
              
              <p>With gratitude,<br>The Donation Team</p>
            </div>
            <div class="footer">
              <p>This is an automated receipt. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} Donation Website. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✉️  Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw - email failure shouldn't break the donation flow
  }
};

module.exports = {
  sendDonationEmail
};
