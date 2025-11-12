import { useState, useEffect } from 'react'
import { FaFilter } from 'react-icons/fa'
import { donationAPI } from '../utils/api'
import CampaignCard from '../components/CampaignCard'
import './Campaigns.css'

function Campaigns() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCampaigns()
    fetchCategories()
  }, [filter])

  const fetchCampaigns = async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? { category: filter } : {}
      const res = await donationAPI.getCampaigns(params)
      setCampaigns(res.data.campaigns)
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await donationAPI.getCampaigns({ limit: 100 })
      const uniqueCategories = [...new Set(
        res.data.campaigns
          .map(c => c.category)
          .filter(Boolean)
      )]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return (
    <div className="campaigns-page">
      <section className="page-hero">
        <div className="container">
          <h1>All Campaigns</h1>
          <p>Browse our active campaigns and support the causes you care about</p>
        </div>
      </section>

      <section className="campaigns-content">
        <div className="container">
          <div className="filters">
            <FaFilter />
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={filter === category ? 'active' : ''}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="no-results">
              <h3>No campaigns found</h3>
              <p>Check back later for new campaigns!</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {campaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Campaigns
