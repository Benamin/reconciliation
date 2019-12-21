import Axios from 'axios'

function http(_method, _url, _params, success) {
  Axios({
    url: _url,
    method: _method, // 默认是 get
    //baseURL: '/request', //首页信息类的接口地址
    params: _method === "GET" ? _params : null,
    data: _method === "POST" ? JSON.stringify(_params) : null,
    timeout: 50000
  }).then(res => {
    if (res.status == 200) {
      success(res.data);
    }
  }).catch(err => {
    alert(JSON.stringify(err));
    window.vm.$message.error({message: '服务器错误',showClose: true});
  })

}
export default {
  get: (url, params, success) => {
    return http("GET", url, params, success)
  },
  postFrom: (url, params, success) => {
    return http("POST", url, params, success)
  }
};
