import './ProgressBar.css'

function ProgressBar({ current, goal, showPercentage = true }) {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="progress-info">
          <span className="progress-current">${current.toLocaleString()}</span>
          <span className="progress-goal">of ${goal.toLocaleString()} goal</span>
          <span className="progress-percentage">{percentage.toFixed(0)}%</span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar
