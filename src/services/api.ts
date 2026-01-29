import axios from 'axios'

const API_BASE_URL = '/api/v1'

const apiCall = axios.create({
  baseURL: API_BASE_URL,
})

// Agregar token a las requests
apiCall.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Manejar respuestas de error
apiCall.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export { apiCall }
