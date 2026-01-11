import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaHeart, FaHandHoldingHeart, FaUsers, FaDollarSign } from 'react-icons/fa'
import { donationAPI } from '../utils/api'
import CampaignCard from '../components/CampaignCard'
import './Home.css'

function Home() {
  const [campaigns, setCampaigns] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [campaignsRes, statsRes] = await Promise.all([
        donationAPI.getCampaigns({ limit: 3 }),
        donationAPI.getStats()
      ])
      setCampaigns(campaignsRes.data.campaigns)
      setStats(statsRes.data.overall)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1>Make a Difference Today</h1>
            <p className="hero-subtitle">
              Your generosity can change lives. Be among the first to support causes that matter.
            </p>
            <div className="hero-actions">
              <Link to="/donate" className="btn btn-primary btn-large">
                 Donate Now
              </Link>
              <Link to="/campaigns" className="btn btn-secondary btn-large">
                Browse Campaigns
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card fade-in">
                <div className="stat-icon">
                  <FaDollarSign />
                </div>
                <h3>${parseFloat(stats.total_raised || 0).toLocaleString()}</h3>
                <p>Total Raised</p>
              </div>
              <div className="stat-card fade-in">
                <div className="stat-icon">
                  <FaHandHoldingHeart />
                </div>
                <h3>{stats.total_donations || 0}</h3>
                <p>Total Donations</p>
              </div>
              <div className="stat-card fade-in">
                <div className="stat-icon">
                  <FaUsers />
                </div>
                <h3>{stats.unique_donors || 0}</h3>
                <p>Unique Donors</p>
              </div>
              <div className="stat-card fade-in">
                <div className="stat-icon">
                  <FaHeart />
                </div>
                <h3>${parseFloat(stats.average_donation || 0).toFixed(0)}</h3>
                <p>Average Donation</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Campaigns */}
      <section className="featured-campaigns">
        <div className="container">
          <div className="section-header">
            <h2>Featured Campaigns</h2>
            <p>Support these urgent causes and make an immediate impact</p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-3">
                {campaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
              <div className="view-all">
                <Link to="/campaigns" className="btn btn-secondary">
                  View All Campaigns
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose a Cause</h3>
              <p>Browse through our verified campaigns and find one that resonates with you</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Make a Donation</h3>
              <p>Contribute any amount securely through our encrypted payment system</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Track Impact</h3>
              <p>Follow campaign progress and see how your donation makes a real difference</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make an Impact?</h2>
            <p>Every donation, no matter the size, helps us move closer to our goals</p>
            <Link to="/donate" className="btn btn-primary btn-large">
              Start Donating
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
