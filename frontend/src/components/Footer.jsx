import { Link } from 'react-router-dom'
import { FaHeart, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>DonateNow</h3>
            </div>
            <p className="footer-description">
              A newly launched platform dedicated to making a difference in the world, one donation at a time. 
              Be part of our journey to create positive change.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
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
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li>
                <FaEnvelope />
                <a href="mailto:info@donatenow.com">info@donatenow.com</a>
              </li>
              <li>
                <FaPhone />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>123 Charity St, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} DonateNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
