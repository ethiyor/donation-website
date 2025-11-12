import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { FaHeart, FaDollarSign } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { donationAPI } from '../utils/api'
import './Donate.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function Donate() {
  const { campaignId } = useParams()
  const navigate = useNavigate()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    name: '',
    email: '',
    message: '',
    is_anonymous: false
  })

  const predefinedAmounts = [10, 25, 50, 100, 250, 500]

  useEffect(() => {
    if (campaignId) {
      fetchCampaign()
    }
  }, [campaignId])

  const fetchCampaign = async () => {
    try {
      const res = await donationAPI.getCampaign(campaignId)
      setCampaign(res.data)
    } catch (error) {
      console.error('Error fetching campaign:', error)
      toast.error('Failed to load campaign')
    }
  }

  const handleAmountSelect = (amount) => {
    setFormData({ ...formData, amount, customAmount: '' })
  }

  const handleCustomAmount = (e) => {
    const value = e.target.value
    setFormData({ ...formData, customAmount: value, amount: value })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const amount = parseFloat(formData.amount || formData.customAmount)

    if (!amount || amount < 1) {
      toast.error('Please enter a valid donation amount')
      return
    }

    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const stripe = await stripePromise

      const payload = {
        amount,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        is_anonymous: formData.is_anonymous,
        ...(campaignId && { campaign_id: campaignId })
      }

      const res = await donationAPI.createCheckoutSession(payload)

      const { error } = await stripe.redirectToCheckout({
        sessionId: res.data.sessionId
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error processing donation:', error)
      toast.error(error.response?.data?.error || 'Failed to process donation')
      setLoading(false)
    }
  }

  return (
    <div className="donate-page">
      <section className="page-hero">
        <div className="container">
          <h1>Make a Donation</h1>
          <p>Your generosity helps us continue our mission</p>
        </div>
      </section>

      <div className="container">
        <div className="donate-content">
          <div className="donate-form-section">
            <form onSubmit={handleSubmit} className="donate-form card">
              {campaign && (
                <div className="selected-campaign">
                  <h3>Donating to: {campaign.title}</h3>
                  <p>{campaign.description}</p>
                </div>
              )}

              <div className="form-section">
                <h3>
                  <FaDollarSign /> Select Amount
                </h3>
                <div className="amount-grid">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`amount-btn ${formData.amount === amount ? 'active' : ''}`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div className="input-group">
                  <label>Custom Amount</label>
                  <div className="input-with-icon">
                    <span className="input-icon">$</span>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={formData.customAmount}
                      onChange={handleCustomAmount}
                      placeholder="Enter custom amount"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>
                  <FaHeart /> Your Information
                </h3>
                <div className="input-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="input-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="input-group">
                  <label>Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Leave a message of support..."
                  />
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="anonymous"
                    name="is_anonymous"
                    checked={formData.is_anonymous}
                    onChange={handleChange}
                  />
                  <label htmlFor="anonymous">Make this donation anonymous</label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large btn-full"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Donate $${formData.amount || formData.customAmount || '0'}`}
              </button>

              <p className="secure-notice">
                🔒 Secure payment powered by Stripe. Your information is safe and encrypted.
              </p>
            </form>
          </div>

          <div className="donate-sidebar">
            <div className="info-box card">
              <h3>Why Donate?</h3>
              <ul>
                <li>✓ 100% of your donation goes to the cause</li>
                <li>✓ Tax-deductible receipt provided</li>
                <li>✓ Secure and encrypted transactions</li>
                <li>✓ Make a real, measurable impact</li>
              </ul>
            </div>

            <div className="info-box card">
              <h3>Need Help?</h3>
              <p>
                If you have any questions about donating, please contact us at{' '}
                <a href="mailto:support@donatenow.com">support@donatenow.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donate
