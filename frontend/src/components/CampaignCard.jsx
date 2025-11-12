import { Link } from 'react-router-dom'
import { FaUsers, FaCalendar } from 'react-icons/fa'
import ProgressBar from './ProgressBar'
import './CampaignCard.css'

function CampaignCard({ campaign }) {
  const {
    id,
    title,
    description,
    goal_amount,
    raised_amount,
    image_url,
    category,
    donor_count,
    created_at
  } = campaign

  return (
    <div className="campaign-card card">
      <div className="campaign-image">
        <img src={image_url || '/placeholder.jpg'} alt={title} />
        {category && <span className="campaign-category badge badge-primary">{category}</span>}
      </div>
      
      <div className="campaign-content">
        <h3>{title}</h3>
        <p className="campaign-description">{description}</p>
        
        <ProgressBar 
          current={parseFloat(raised_amount || 0)} 
          goal={parseFloat(goal_amount)} 
        />
        
        <div className="campaign-meta">
          <span>
            <FaUsers /> {donor_count || 0} donors
          </span>
          <span>
            <FaCalendar /> {new Date(created_at).toLocaleDateString()}
          </span>
        </div>
        
        <Link to={`/campaigns/${id}`} className="btn btn-primary btn-full">
          View Campaign
        </Link>
      </div>
    </div>
  )
}

export default CampaignCard
