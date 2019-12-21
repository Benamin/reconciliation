import http from './request.js'

const api = {
  // 查看校验结果
  userlogin: (data, headers, success) => {
    http({
      url: '/api/login/userlogin',
      data: data,
      method: 'post',
      headers: headers
    }).then(res => {
      success(res)
    })
  }
}
export default api
