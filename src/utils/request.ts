import axios from 'axios'
import store from '@/store'
import { useToast } from 'vue-toastification'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

/**
 * 响应拦截器
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
    console.error(error) // for debug
    Promise.reject(error)
  }
)

/**
 * 请求拦截器
 */
service.interceptors.response.use(error => {
  console.log(error) // for debug
  const { data } = error
  if (data && data.message) {
    const toast = useToast()
    toast.error(data.message)
  }
  return Promise.reject(error)
})

export default service
