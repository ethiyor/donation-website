import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaUsers, FaCalendar, FaHeart, FaDollarSign } from 'react-icons/fa'
import { donationAPI } from '../utils/api'
import ProgressBar from '../components/ProgressBar'
import './CampaignDetail.css'

function CampaignDetail() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaignData()
  }, [id])

  const fetchCampaignData = async () => {
    try {
      const [campaignRes, donationsRes] = await Promise.all([
        donationAPI.getCampaign(id),
        donationAPI.getDonations({ campaign_id: id, limit: 10 })
      ])
      setCampaign(campaignRes.data)
      setDonations(donationsRes.data.donations)
    } catch (error) {
      console.error('Error fetching campaign:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Campaign not found</h2>
        <Link to="/campaigns" className="btn btn-primary">Back to Campaigns</Link>
      </div>
    )
  }

  return (
    <div className="campaign-detail-page">
      <div className="campaign-header">
        <img src={campaign.image_url} alt={campaign.title} />
        <div className="campaign-header-overlay">
          <div className="container">
            <div className="campaign-header-content">
              {campaign.category && (
                <span className="badge badge-primary">{campaign.category}</span>
              )}
              <h1>{campaign.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="campaign-detail-content">
          <div className="campaign-main">
            <div className="campaign-stats-bar">
              <div className="stat-item">
                <FaDollarSign />
                <div>
                  <strong>${parseFloat(campaign.raised_amount).toLocaleString()}</strong>
                  <span>raised of ${parseFloat(campaign.goal_amount).toLocaleString()}</span>
                </div>
              </div>
              <div className="stat-item">
                <FaUsers />
                <div>
                  <strong>{campaign.donor_count || 0}</strong>
                  <span>donors</span>
                </div>
              </div>
              <div className="stat-item">
                <FaCalendar />
                <div>
                  <strong>{new Date(campaign.created_at).toLocaleDateString()}</strong>
                  <span>started</span>
                </div>
              </div>
            </div>

            <ProgressBar 
              current={parseFloat(campaign.raised_amount)} 
              goal={parseFloat(campaign.goal_amount)} 
            />

            <div className="campaign-description">
              <h2>About This Campaign</h2>
              <p>{campaign.description}</p>
            </div>

            {donations.length > 0 && (
              <div className="recent-donations">
                <h3>Recent Donations</h3>
                <div className="donations-list">
                  {donations.map((donation, index) => (
                    <div key={index} className="donation-item">
                      <div className="donation-avatar">
                        <FaHeart />
                      </div>
                      <div className="donation-info">
                        <strong>{donation.name}</strong>
                        <span className="donation-amount">
                          ${parseFloat(donation.amount).toFixed(2)}
                        </span>
                      </div>
                      <span className="donation-date">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="campaign-sidebar">
            <div className="donation-box card">
              <h3>Support This Campaign</h3>
              <p>Your donation can make a real difference</p>
              <Link 
                to={`/donate/${id}`} 
                className="btn btn-primary btn-large btn-full"
              >
                <FaHeart /> Donate Now
              </Link>
              <Link 
                to="/campaigns" 
                className="btn btn-secondary btn-full"
                style={{ marginTop: '12px' }}
              >
                View Other Campaigns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetail
