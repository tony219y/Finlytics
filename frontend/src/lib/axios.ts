import axios from 'axios'


const api = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://api-finlytics.tony219y.com/api',
})

// auto include token to header all api endpoint
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
