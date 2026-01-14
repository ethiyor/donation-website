import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaHeart, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()
  const [showModal, setShowModal] = useState(false)

  const handleSocialClick = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>EthioCare</h3>
            </div>
            <p className="footer-description">
            A student-led grassroots initiative founded by Ethiopian and Eritrean students across universities in the United States, dedicated to turning compassion into action, beginning in Ethiopia, with a broader vision for impact across East Africa</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" onClick={handleSocialClick}><FaFacebook /></a>
              <a href="#" aria-label="Twitter" onClick={handleSocialClick}><FaTwitter /></a>
              <a href="#" aria-label="Instagram" onClick={handleSocialClick}><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" onClick={handleSocialClick}><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/campaigns">Campaigns</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link to="/donate">Make a Donation</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li>
                <FaEnvelope />
                <a href="mailto:ytk2108@columbia.edu">ytk2108@columbia.edu</a>
              </li>
              <li>
                <FaPhone />
                <a href="tel:+13322656980">+1 (332) 265-6980</a>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>New York City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} EthioCare. All rights reserved.</p>
        </div>
      </div>

      {showModal && (
        <div className="social-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="social-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h3>Coming Soon!</h3>
            <p>Our social media profiles will be included soon. Stay tuned for updates!</p>
            <button className="btn btn-primary" onClick={() => setShowModal(false)}>Got It</button>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
