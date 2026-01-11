import { FaHeart, FaEye, FaUsers, FaHandsHelping } from 'react-icons/fa'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Dedicated to supporting struggling communities, starting in Ethiopia</p>
        </div>
      </section>

      <div className="container">
        <section className="about-content">
          <div className="about-intro">
            <h2>Our Story</h2>
            <p>
EthioCare is a newly launched, grassroots, student-led fundraising initiative created to support individuals and families in Ethiopia facing homelessness, displacement, and harsh living conditions—particularly those living in shelters due to political instability in different regions of the country
            </p>
            <p>
Founded with a vision to connect generous donors, especially students across the United States, with meaningful humanitarian causes, EthioCare is built on the belief that everyone has the power to make a difference, regardless of the size of their contribution.
            </p>
            <p>
              While our current focus is Ethiopia, our long-term goal is to extend this impact across East Africa—supporting communities affected by displacement, poverty, and instability through grassroots action and collective care
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Our Mission</h3>
              <p>
                To mobilize students across the United States and compassionate supporters worldwide to provide direct humanitarian support to struggling communities in Ethiopia.
              </p>
            </div>

            <div className="value-card card">
              <div className="value-icon">
                <FaEye />
              </div>
              <h3>Our Vision</h3>
              <p>
                A future where collective action—no matter how small—creates meaningful relief for people affected by displacement and hardship in Ethiopia, while laying the foundation for broader impact across East Africa.
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
               All donations collected through EthioCare are dedicated to supporting struggling communities in Ethiopia. This is a grassroots fundraising effort, and funds are collected personally and distributed directly or through trusted local channels.
</p>
                <p> Donations are not tax-deductible!
              </p>
            </div>
          </div>

          <div className="impact-section">
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
                <h3>Africa</h3>
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
