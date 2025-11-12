import { Link } from 'react-router-dom'
import { FaTimesCircle } from 'react-icons/fa'
import './Cancel.css'

function Cancel() {
  return (
    <div className="cancel-page">
      <div className="container">
        <div className="cancel-content card fade-in">
          <div className="cancel-icon">
            <FaTimesCircle />
          </div>
          <h1>Donation Cancelled</h1>
          <p className="cancel-subtitle">
            Your donation was not completed. No charges have been made to your account.
          </p>

          <div className="cancel-message">
            <p>
              We understand that circumstances change. If you'd like to try again or have any questions, 
              please don't hesitate to reach out to us.
            </p>
          </div>

          <div className="cancel-actions">
            <Link to="/donate" className="btn btn-primary">
              Try Again
            </Link>
            <Link to="/campaigns" className="btn btn-secondary">
              Browse Campaigns
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cancel
