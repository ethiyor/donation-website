import { FaHandHoldingHeart, FaHome, FaCampground, FaGlobeAfrica, FaCheckCircle } from 'react-icons/fa'
import { useEffect } from 'react'
import './Campaigns.css'

function Campaigns() {

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .stagger-item')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="campaigns-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="hero-title">Our Focused Campaigns</h1>
          <p className="hero-subtitle">Supporting vulnerable populations across Ethiopia/Eritrea with dignity, compassion, and direct humanitarian relief</p>
        </div>
      </section>

      <section className="campaign-mission">
        <div className="container">
          <div className="mission-content fade-in-up">
            <p className="mission-intro">
              EthioCare focuses on supporting individuals and families across Ethiopia who are facing displacement, 
              homelessness, and severe living conditions as a result of instability, conflict, and economic hardship. 
              Our campaigns prioritize vulnerable populations living in shelters, displacement camps, and informal settings, 
              with an emphasis on dignity, basic needs, and direct humanitarian relief.
            </p>
          </div>
        </div>
      </section>

      <section className="campaign-details">
        <div className="container">
          <div className="campaign-detail-card fade-in-left stagger-item" style={{ animationDelay: '0.1s' }}>
            <div className="card-header">
              <FaHome className="campaign-icon" />
              <h2>Homeless Families & Elderly in Addis Ababa</h2>
            </div>
            <p className="campaign-description">
              This campaign supports families and older individuals experiencing homelessness in Addis Ababa. 
              Many lack stable shelter, consistent access to food, and basic healthcare, leaving elderly individuals 
              particularly vulnerable.
            </p>
            <div className="support-areas">
              <h4>Support Areas Include:</h4>
              <ul>
                <li>Emergency food assistance</li>
                <li>Basic shelter support</li>
                <li>Clothing and hygiene essentials</li>
                <li>Care for elderly individuals with limited family or social support</li>
              </ul>
            </div>
          </div>

          <div className="campaign-detail-card fade-in-right stagger-item" style={{ animationDelay: '0.2s' }}>
            <div className="card-header">
              <FaCampground className="campaign-icon" />
              <h2>Internally Displaced People (IDPs) in Amhara Region</h2>
            </div>
            <p className="campaign-description">
              EthioCare supports internally displaced individuals and families living in displacement camps and 
              temporary shelters across the Amhara Region, including areas in Debre Birhan, South Wollo, and 
              surrounding zones.
            </p>
            <div className="highlight-box">
              <p>
                Documented displacement sites in the region include camps such as <strong>China Camp (Debre Birhan)</strong>, 
                <strong> Jari 1</strong>, <strong>Jari 2</strong>, <strong>Mekane Eyesus</strong>, and <strong>Turk Camp</strong> in South Wollo, as well as other informal and 
                makeshift shelter locations. Many residents of these camps have lived in displacement for extended 
                periods, facing severe shortages of food, shelter materials, medical care, and sanitation.
              </p>
            </div>
            <div className="support-areas">
              <h4>Key Focus Areas:</h4>
              <ul>
                <li>Families displaced by conflict and instability</li>
                <li>Elderly individuals, children, and people with disabilities</li>
                <li>Support for food, shelter materials, and basic medical needs</li>
              </ul>
            </div>
          </div>

          <div className="campaign-detail-card fade-in-left stagger-item" style={{ animationDelay: '0.3s' }}>
            <div className="card-header">
              <FaHandHoldingHeart className="campaign-icon" />
              <h2>Displaced Ethiopians & Eritrean Refugees in Tigray</h2>
            </div>
            <p className="campaign-description">
              This campaign focuses on displaced populations sheltering in and around the Hitsats area in the Tigray Region.
            </p>
            <div className="highlight-box">
              <p>
                Hitsats was originally established as a refugee camp for Eritrean refugees fleeing persecution and hardship. 
                Following the destruction of the camp during the Tigray conflict, the area has since become a shelter site 
                for internally displaced Ethiopians as well as Eritrean refugees facing renewed displacement and extreme 
                humanitarian conditions.
              </p>
            </div>
            <div className="info-banner">
              Reports from the area indicate severe shortages of food, healthcare, clean water, and essential services, 
              with particularly high risks for children, women, and elderly individuals.
            </div>
            <div className="support-areas">
              <h4>Support Priorities Include:</h4>
              <ul>
                <li>Emergency food and nutritional assistance</li>
                <li>Basic healthcare and medical support</li>
                <li>Aid for vulnerable displaced individuals and refugee populations</li>
              </ul>
            </div>
          </div>

          <div className="campaign-detail-card fade-in-right stagger-item" style={{ animationDelay: '0.4s' }}>
            <div className="card-header">
              <FaGlobeAfrica className="campaign-icon" />
              <h2>Nationwide Support for Individuals in Crisis</h2>
            </div>
            <p className="campaign-description">
              Beyond specific regions and camps, EthioCare remains responsive to urgent humanitarian needs across Ethiopia. 
              This campaign allows flexibility to support individuals and families encountered nationwide who are facing 
              extreme hardship due to displacement, poverty, or sudden crisis.
            </p>
            <div className="support-areas">
              <h4>This Includes:</h4>
              <ul>
                <li>Individuals living in informal shelters</li>
                <li>Families affected by sudden displacement</li>
                <li>Communities with limited or inconsistent access to aid</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="our-approach">
        <div className="container">
          <h2 className="fade-in-up">Our Approach</h2>
          <div className="approach-grid">
            <div className="approach-item fade-in-up stagger-item" style={{ animationDelay: '0.1s' }}>
              <FaCheckCircle className="approach-icon" />
              <h4>Direct Humanitarian Support</h4>
              <p>We focus on providing immediate, tangible relief to those in need</p>
            </div>
            <div className="approach-item fade-in-up stagger-item" style={{ animationDelay: '0.2s' }}>
              <FaCheckCircle className="approach-icon" />
              <h4>Vulnerable Populations First</h4>
              <p>Priority given to displaced individuals and families facing the harshest conditions</p>
            </div>
            <div className="approach-item fade-in-up stagger-item" style={{ animationDelay: '0.3s' }}>
              <FaCheckCircle className="approach-icon" />
              <h4>Trusted Local Channels</h4>
              <p>Working through established community networks to ensure effective delivery</p>
            </div>
            <div className="approach-item fade-in-up stagger-item" style={{ animationDelay: '0.4s' }}>
              <FaCheckCircle className="approach-icon" />
              <h4>Transparency & Accountability</h4>
              <p>Maintaining clear communication about how resources are used</p>
            </div>
            <div className="approach-item fade-in-up stagger-item" style={{ animationDelay: '0.5s' }}>
              <FaCheckCircle className="approach-icon" />
              <h4>Responsive to Urgent Needs</h4>
              <p>Adapting quickly to emerging crises and evolving situations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-matters">
        <div className="container">
          <h2 className="fade-in-up">Why These Campaigns Matter</h2>
          <p className="why-matters-text fade-in-up">
            Displacement and homelessness continue to affect millions across Ethiopia. By focusing on specific 
            regions and documented displacement sites while remaining adaptable to emerging needs, EthioCare aims 
            to ensure that even small donations can provide meaningful relief to those facing the harshest conditions. 
            Your support brings dignity, hope, and essential resources to families and individuals who have nowhere 
            else to turn.
          </p>
        </div>
      </section>


    </div>
  )
}

export default Campaigns
