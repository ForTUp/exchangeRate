import axios from 'axios';
import VueAxios from 'vue-axios'
import router from '../routers'
import { getToken, setToken, removeToken } from './token.js'   //引入auth.js
import api from './api.js'
import store from "../store";

axios.defaults.timeout = 5000; //请求超时5秒
//axios.defaults.baseURL ='http://hh.praymore.xyz/';  //请求base url
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //设置


// // 是否正在刷新的标记 -- 防止重复发出刷新token接口
let isRefreshing = true;
// // 判断token是否失效: return: true为过期
// function isOAverdue() {
//     // 当离过期时间还有半小时时, 也判断为过期
//     // getTokenItem('time'): 获取存入localStorage的过期时间
//     return Math.floor((Date.now() - getTokenItme('time')) / 1000) + 30 * 60 > 
//         getTokenItme('expires_in');
// }

//http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token');
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
	  if(response.code == 401 && isRefreshing){
		  refreshToken()
		  isRefreshing = false;
		  const retryOriginalRequest = new Promise((resolve) => {
				  addSubscriber(()=> {
					  resolve(againReqest(response))
				  })
			  });
		  return retryOriginalRequest;
	  }
    return response
  }, 
  err => {
    return Promise.reject(err)
  }
)

refreshToken:(data)=>{
	return new Promise((resolve, reject) => {
		get('/api/token/refresh',data).then((response)=>{
			let {data} = response;
			if(response.code==1){
				store.commit("user/setToken",data.userinfo.token);
			}else{
				sessionStorage.clear();
				this.$router.push('/login');
			}
			isRefreshing = true;
			resolve(response);
		}).catch((err)=>{
			 reject(err);
		})
	})
},

async function againReqest(response){
	let config = response.config
	config.header['token'] =sessionStorage.getItem('token');
	let res = post(config);
	return res;
}
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
 
  export function postJson(url, data ){   return new Promise((resolve, reject) => {      axios.request({
		 url, 		method : 'post',		headers:{			'Content-Type': 'text/plain'		},
		data:JSON.stringify(data)	  })      .then(response => {        resolve(response.data);      }, err => {        reject(err)      })   }) }