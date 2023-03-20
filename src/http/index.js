import axios from "axios"

//创造一个axios的实例
let instance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 5000,
})

//拦截器
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // 请求发出前要执行的方法
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response) {
    //每次请求成功后第一个调用的方法
    const authorization = response.headers.authorization
    authorization && localStorage.setItem("token", authorization)
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token")
      location.href = "/login"
    }
    return Promise.reject(error)
  }
)

/**
 * 封装http请求的方法
 * @param {*} option
 * method 请求方法
 * path 请求接口地址
 * params 请求参数
 */
async function http(option = {}) {
  let result = null
  if (option.method === "get" || option.method === "delete") {
    await instance[option.method](option.path, {
      params: option.params,
    })
      .then((res) => {
        result = res
      })
      .catch((err) => {
        result = err
      })
  } else if (option.method === "post" || option.method === "put") {
    await instance[option.method](option.path, option.params)
      .then((res) => {
        result = res
      })
      .catch((err) => {
        result = err
      })
  }
  return result
}

export default http
