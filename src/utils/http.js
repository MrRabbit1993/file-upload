import axios from 'axios'
const service = axios.create({
    // baseURL: process.env.VUE_APP_API_URL,
    timeout: 15 * 1000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => config,
    err => Promise.reject(err)
)
export default service