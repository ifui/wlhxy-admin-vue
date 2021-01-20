import axios from 'axios'
import store from '@/store'
import { useToast } from 'vue-toastification'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  config => {
    // 添加 token 到请求头里
    const token = store.getters['userinfo/token']
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  response => response,
  error => {
    const { data } = error.response
    if (data && data.message) {
      const toast = useToast()
      toast.error(data.message)
    }
    return Promise.reject(error)
  }
)

export default service
