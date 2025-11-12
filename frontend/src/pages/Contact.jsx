import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { toast } from 'react-toastify'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you! Your message has been sent successfully.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitting(false)
    }, 1500)
  }

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </section>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info-section">
            <h2>Get In Touch</h2>
            <p className="contact-intro">
              Have questions, suggestions, or need support? Our team is here to help you make 
              the most impact with your donations.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <h3>Email Us</h3>
                  <a href="mailto:info@donatenow.com">info@donatenow.com</a>
                  <a href="mailto:support@donatenow.com">support@donatenow.com</a>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div>
                  <h3>Call Us</h3>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                  <p>Mon-Fri: 9AM - 6PM EST</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3>Visit Us</h3>
                  <p>123 Charity Street</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form card">
              <h2>Send Us a Message</h2>

              <div className="input-group">
                <label>Your Name *</label>
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
                <label>Your Email *</label>
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
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                />
              </div>

              <div className="input-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large btn-full"
                disabled={submitting}
              >
                <FaPaperPlane />
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
