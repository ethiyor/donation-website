import { FaHeart, FaEye, FaUsers, FaHandsHelping } from 'react-icons/fa'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Dedicated to making a positive impact in communities worldwide</p>
        </div>
      </section>

      <div className="container">
        <section className="about-content">
          <div className="about-intro">
            <h2>Our Story</h2>
            <p>
              Newly launched with a vision to connect generous donors with meaningful causes, DonateNow 
              is on a mission to facilitate positive change across communities. We believe that everyone 
              has the power to make a difference, regardless of the size of their contribution.
            </p>
            <p>
              Our platform is designed to make charitable giving accessible, transparent, and secure. 
              From disaster relief to education initiatives, healthcare projects to environmental conservation, 
              we're committed to supporting causes that matter and building a community of changemakers.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Our Mission</h3>
              <p>
                To empower individuals and organizations to create lasting positive change through 
                accessible, transparent, and secure charitable giving.
              </p>
            </div>

            <div className="value-card card">
              <div className="value-icon">
                <FaEye />
              </div>
              <h3>Our Vision</h3>
              <p>
                A world where charitable giving is effortless, transparent, and impactful, enabling 
                everyone to contribute to causes they care about.
              </p>
            </div>

            <div className="value-card card">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h3>Our Values</h3>
              <p>
                Transparency, integrity, compassion, and accountability guide everything we do as we 
                work to build trust between donors and causes.
              </p>
            </div>

            <div className="value-card card">
              <div className="value-icon">
                <FaHandsHelping />
              </div>
              <h3>Our Commitment</h3>
              <p>
                100% of your donation goes to your chosen cause. We're committed to maintaining the 
                highest standards of security and transparency.
              </p>
            </div>
          </div>

          <div className="impact-section">
            <h2>Our Goals</h2>
            <div className="impact-stats">
              <div className="impact-stat">
                <h3>100%</h3>
                <p>Secure & Transparent</p>
              </div>
              <div className="impact-stat">
                <h3>24/7</h3>
                <p>Platform Availability</p>
              </div>
              <div className="impact-stat">
                <h3>Growing</h3>
                <p>Campaign Network</p>
              </div>
              <div className="impact-stat">
                <h3>Global</h3>
                <p>Reach & Impact</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
