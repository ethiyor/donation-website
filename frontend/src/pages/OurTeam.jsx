import { FaGraduationCap, FaUsers, FaHandshake, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './OurTeam.css'

function OurTeam() {
  const leadership = [
    {
      name: 'Natnael Assefa',
      role: 'Founder & Coordinator',
      university: 'Swarthmore University',
      description: 'Natnael oversees EthioCare\'s strategic direction, partnerships, and overall coordination, helping guide the organization\'s mission and long-term vision.'
    },
     {
      name: 'Yordanos Tiruneh',
      role: 'Co-Founder & Coordinator',
      university: 'Columbia University',
      description: 'Yordanos contributes to organizational coordination, communications, and technical development, helping align EthioCare\'s mission with effective implementation.'
    },
    {
      name: 'Eyuael Simeneh',
      role: 'Coordinator',
      university: 'Stanford University',
      description: 'Eyuael supports coordination efforts, outreach, and operational planning to strengthen EthioCare\'s impact and community engagement.'
    },
   
    {
      name: 'Tesfalem Hussein',
      role: 'Coordinator',
      university: 'Columbia University',
      description: 'Tesfalem assists with coordination and outreach, supporting collaboration across teams and helping connect resources to communities in need.'
    }
  ]

  const coreTeam = [
    {
      name: 'Dires Abateneh',
      university: 'Williams College',
      description: 'Dires supports EthioCare\'s initiatives through collaboration, outreach, and project assistance.'
    },
    {
      name: 'Yihalem Akalu',
      university: 'Columbia University',
      description: 'Yihalem contributes to coordination efforts and community engagement, supporting EthioCare\'s mission and ongoing projects.'
    }
  ]

  return (
    <div className="our-team-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Team</h1>
          <p>Student-led grassroots initiative driven by compassion and commitment</p>
        </div>
      </section>

      <section className="team-intro">
        <div className="container">
          <div className="intro-content">
            <p>
              EthioCare is a student-led grassroots initiative founded and led by Ethiopian and Eritrean students 
              across universities in the United States. Our team works collaboratively to coordinate humanitarian support, 
              mobilize resources, and ensure responsible, transparent aid delivery to communities in need, beginning in 
              Ethiopia, with a broader vision for impact across East Africa.
            </p>
          </div>
        </div>
      </section>

      <section className="leadership-section">
        <div className="container">
          <div className="section-header">
            <FaUsers className="section-icon" />
            <h2>Leadership & Coordinators</h2>
          </div>
          <div className="team-grid">
            {leadership.map((member, index) => (
              <div key={index} className="team-card fade-in">
                <div className="card-header">
                  <div className="avatar">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                  </div>
                </div>
                <div className="university-badge">
                  <FaGraduationCap />
                  <span>{member.university}</span>
                </div>
                <p className="description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="core-team-section">
        <div className="container">
          <div className="section-header">
            <FaHandshake className="section-icon" />
            <h2>Core Team Members</h2>
          </div>
          <div className="core-team-grid">
            {coreTeam.map((member, index) => (
              <div key={index} className="core-team-card fade-in">
                <div className="card-header">
                  <div className="avatar">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <div className="university-badge">
                      <FaGraduationCap />
                      <span>{member.university}</span>
                    </div>
                  </div>
                </div>
                <p className="description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="network-section">
        <div className="container">
          <div className="network-content">
            <h2>Our Extended Network</h2>
            <p>
              EthioCare collaborates with trusted local volunteers and community contacts in Ethiopia and neighboring 
              regions who assist with coordination and aid distribution. For safety and privacy reasons, not all 
              collaborators are listed publicly.
            </p>
          </div>
        </div>
      </section>

      <section className="join-team-section">
        <div className="container">
          <div className="join-content">
            <FaEnvelope className="join-icon" />
            <h2>Join the Team</h2>
            <p>
              We welcome students and volunteers who share our commitment to compassion, accountability, 
              and meaningful impact.
            </p>
            <p className="join-description">
              Interested in joining EthioCare? Reach out to us through our Contact page or email us to learn more 
              about volunteering, coordination roles, and collaboration opportunities.
            </p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurTeam
