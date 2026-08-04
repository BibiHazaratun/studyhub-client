import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Server root (no /api suffix) — used to build full file URLs like /uploads/xyz.pdf
export const SERVER_ROOT = API_BASE.replace(/\/api\/?$/, '')

const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('studyhub_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
