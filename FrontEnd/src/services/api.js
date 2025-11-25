import axios from 'axios'

// Base URL untuk API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'

// Membuat instance axios dengan konfigurasi default
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Enable sending cookies
})

// Interceptor untuk handling token (jika diperlukan)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor untuk handling response
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server merespon dengan status error
      console.error('Response Error:', error.response.data)
      
      // Handle unauthorized error (401)
      if (error.response.status === 401) {
        // Redirect to login if needed
        window.location.href = '/login'
      }
      
      return Promise.reject(error.response.data)
    } else if (error.request) {
      // Request dibuat tetapi tidak ada response
      console.error('Request Error:', error.request)
      return Promise.reject({ message: 'Tidak dapat terhubung ke server' })
    } else {
      // Error dalam membuat request
      console.error('Error:', error.message)
      return Promise.reject({ message: error.message })
    }
  }
)

export default api