import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor for auth token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// API methods
export const donationAPI = {
  // Campaigns
  getCampaigns: (params) => api.get('/campaigns', { params }),
  getCampaign: (id) => api.get(`/campaigns/${id}`),
  createCampaign: (data) => api.post('/campaigns', data),
  
  // Donations
  getDonations: (params) => api.get('/donations', { params }),
  createCheckoutSession: (data) => api.post('/donations/create-checkout-session', data),
  getLeaderboard: (params) => api.get('/donations/leaderboard/top', { params }),
  
  // Stats
  getStats: () => api.get('/stats'),
  getTrends: (params) => api.get('/stats/trends', { params }),
  
  // Auth
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
}

export default api
