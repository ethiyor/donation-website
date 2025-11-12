import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FaCheckCircle, FaHeart } from 'react-icons/fa'
import './Success.css'

function Success() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    // You could fetch donation details here using sessionId
    console.log('Payment successful! Session ID:', sessionId)
  }, [sessionId])

  return (
    <div className="success-page">
      <div className="container">
        <div className="success-content card fade-in">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h1>Thank You for Your Donation!</h1>
          <p className="success-subtitle">
            Your generosity makes a real difference. We've sent a confirmation email with your donation receipt.
          </p>

          <div className="success-details">
            <div className="detail-item">
              <FaHeart />
              <div>
                <strong>Your Impact</strong>
                <p>Your donation will directly support our mission and help those in need</p>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/campaigns" className="btn btn-primary">
              View Other Campaigns
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>

          <div className="social-share">
            <h3>Share Your Good Deed</h3>
            <p>Inspire others to make a difference</p>
            <div className="share-buttons">
              <button className="share-btn facebook">Share on Facebook</button>
              <button className="share-btn twitter">Share on Twitter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
