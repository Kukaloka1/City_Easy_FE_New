import axios from 'axios'
import { getAuth, getIdToken } from 'firebase/auth'
import { handleError } from './support/errorHandler'

const url =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.REACT_APP_API_URL

if (!url) throw new Error('API base URL missing (VITE_API_URL | VITE_API_BASE_URL | REACT_APP_API_URL)')

const instance = axios.create({ baseURL: url })

instance.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth()
      if (auth?.currentUser) {
        const token = await getIdToken(auth.currentUser)
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    } catch (err) {
      handleError(err, 'requestInterceptor')
      return Promise.reject(err)
    }
  },
  (err) => { handleError(err, 'requestInterceptor'); return Promise.reject(err) }
)

export default instance
