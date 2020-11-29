import axios from 'axios'
import Vue from 'vue'

//超时
axios.defaults.timeout = 3000;

//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

//请求拦截器
axios.interceptors.request.use(
  config=>{
    const token = localStorage.getItem('book_token')
    token && (config.headers.Authorization = token)
    return config
  },
  error=>{
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(res => {
  if (res.data.code === 200){
    return Promise.resolve(res.data)
  }else{
    return Promise.reject(res.data)
  }
}, err => {
  if (err.response.status === 500) {
    Vue.prototype.$message.error('服务器内部错误')
  } 
  else if (err.response.data) {
    Vue.prototype.$message.error(err.response.data)
  }
  return Promise.reject(err)
})

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    // axios.post(url,QS.stringify(params))
    axios.post(url, params)
      .then(res => {
        // doSomething
        resolve(res.data)
        // resolve(res.data.data)
      }, message => {
        reject(message)
      })
  })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        // doSomething
        resolve(res.data)
        // resolve(res.data.data)
      }, message => {
        reject(message)
      })
  })
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(res => {
        // doSomething
        resolve(res.data)
        // resolve(res.data.data)
      }, message => {
        reject(message)
      })
  })
}

/**
 * delete
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function deleteFn (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params)
      .then(res => {
        // doSomething
        resolve(res.data)
        // resolve(res.data.data)
      }, message => {
        reject(message)
      })
  })
}

export default axios
