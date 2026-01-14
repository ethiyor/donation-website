import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaDollarSign, FaQrcode, FaMobileAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { donationAPI } from '../utils/api'
import paypalQR from './images/paypal.png'
import venmoQR from './images/venmo.png'
import zelleQR from './images/zelle.png'
// import telebirrQR from './images/telebirr.png'  // Uncomment after adding telebirr.png
import './Donate.css'

function Donate() {
  const { campaignId } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [showModal, setShowModal] = useState(false)

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: FaQrcode, qr: paypalQR },
    { id: 'venmo', name: 'Venmo', icon: FaQrcode, qr: venmoQR },
    { id: 'zelle', name: 'Zelle', icon: FaQrcode, qr: zelleQR },
    { id: 'telebirr', name: 'TeleBirr', icon: FaMobileAlt, qr: null }
  ]

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

  const handlePaymentMethodClick = (methodId) => {
    setPaymentMethod(methodId)
    setShowModal(true)
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
            <div className="donate-form card">
              {campaign && (
                <div className="selected-campaign">
                  <h3>Donating to: {campaign.title}</h3>
                  <p>{campaign.description}</p>
                </div>
              )}

              <div className="form-section">
                <h3>
                  <FaDollarSign /> Choose Payment Method
                </h3>
                <div className="payment-methods">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <button
                        key={method.id}
                        type="button"
                        className="payment-method-btn"
                        onClick={() => handlePaymentMethodClick(method.id)}
                      >
                        <Icon />
                        <span>{method.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="donate-sidebar">
            <div className="info-box card">
              <h3>Why Donate?</h3>
              <ul>
                <li>100% of your donation goes to the cause</li>
                <li>Secure and encrypted transactions</li>
                <li>Make a real, measurable impact</li>
                <li>Receipts provided for all donations</li>
              </ul>
              <p className="tax-notice"><small>Note: Donations are not tax-deductible</small></p>
            </div>

            <div className="info-box card">
              <h3>Need Help?</h3>
              <p>
                If you have any questions about donating, please contact us at{' '}
                <a href="mailto:ytk2108@columbia.edu">ytk2108@columbia.edu</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h3>{paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} Payment</h3>
            
            {paymentMethod === 'telebirr' ? (
              <div className="telebirr-section">
                <div className="telebirr-icon">
                  <FaMobileAlt />
                </div>
                <p className="telebirr-notice">
                  To donate using TeleBirr in Ethiopian Birr:
                </p>
                <div className="telebirr-number">
                  <strong>+251 9XXXXXXXX</strong>
                </div>
                <p className="telebirr-instructions">
                  1. Open your TeleBirr app<br/>
                  2. Send money to the number above<br/>
                  3. Include your name in the note/reference<br/>
                  4. Email your receipt to <a href="mailto:ytk2108@columbia.edu">ytk2108@columbia.edu</a>
                </p>
              </div>
            ) : (
              <div className="qr-code-section">
                <p className="qr-notice">
                  Scan the QR code with your {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} app:
                </p>
                <div className="qr-code-container">
                  <img 
                    src={paymentMethods.find(m => m.id === paymentMethod)?.qr} 
                    alt={`${paymentMethod} QR Code`}
                    className="qr-code-image"
                  />
                </div>
                <p className="qr-instructions">
                  After completing the payment, please email your receipt to{' '}
                  <a href="mailto:ytk2108@columbia.edu">ytk2108@columbia.edu</a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Donate
