import axios from 'axios'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  timeout: 60 * 1000,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error) // for debug
  return null
})
// response 拦截器
service.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response.data)
  } else {
    window.vm.$message.error({message: '接口错误', showClose: true})
  }
  return null
}, error => {
  console.log(error)
  

  return null
})
export default service
