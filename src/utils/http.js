import axios from 'axios';
import VueAxios from 'vue-axios'
import router from '../routers'
import { getToken, setToken, removeToken } from '../utils/token.js'   //引入auth.js

axios.defaults.timeout = 5000; //请求超时5秒
//axios.defaults.baseURL ='http://hh.praymore.xyz/';  //请求base url
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //设置


//http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token')
	console.log('token'+getToken())
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers = {
        'token': token
      }
    }
    return config
  }, 
  err => {
    return Promise.reject(err)
  }
)

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 4003) {
      Toast({
        mes: '您没有权限操作！',
        timeout: 1500,
        callback: () => {
          router.go(-1);
        }
      });
      
      return false;
    }
    if (response.data.code === -1) {
      localStorage.removeItem('token')
      router.push({
        path:"/login",
        querry:{redirect: router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response
  }, 
  err => {
    if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
      Toast({
          mes: '网络异常，连接超时...',
          timeout: 1500
      });
    }
    return Promise.reject(err)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params={}, headers={}){
  return new Promise((resolve, reject) => {
    axios.get(url,{
      params: params,
      headers: headers
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url, data = {}){
   return new Promise((resolve, reject) => {
      axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
   })
 }