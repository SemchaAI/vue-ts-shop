import type { IAuthResponse } from '@/models/response/AuthResponce'
import axios, { Axios, AxiosError } from 'axios'

const server = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})

server.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('auth')}`
  return config
})
server.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<IAuthResponse>(
          `${import.meta.env.VITE_BASE_URL}/user/refresh`,
          {
            withCredentials: true
          }
        )
        localStorage.setItem('auth', response.data.accessToken)
        console.log('Токен обновлен')
        // console.log(server.request(originalRequest))
        return server.request(originalRequest)
      } catch (error) {
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    throw error
  }
)

export default server
