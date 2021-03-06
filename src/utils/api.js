import {post,get,postJson,postFile} from './http.js'
import { getToken, setToken, removeToken } from './token.js'   //引入auth.js
import store from "../store";

export default {
	getConfig:(data)=>{
		return new Promise((resolve, reject) => {
			get('/api/category/getConfig',data).then((response)=>{
				let {data} = response;
				 resolve(data);
			}).catch((err)=>{
				 reject(err);
			})
		})
	},
	
	login:(param)=>{
		return new Promise((resolve, reject) => {
			post('/api/user/login',param).then((response)=>{
				if(response.code==1){
					const {data} = response;
					console.log(response)
					store.commit("user/setUserId",data.userinfo.user_id);
					store.commit("user/setToken",data.userinfo.token);
					store.commit("user/setUserInfo",JSON.stringify(data.userinfo));
				}
				resolve(response);
			}).catch((err)=>{
				 reject(err);
			})
		})
	},
	logout:(data)=>{
		return new Promise((resolve, reject) => {
			get('/api/user/logout',data).then((response)=>{
				if(response.code==1){
					store.commit("user/setUserId",null);
					store.commit("user/setToken",null);
					store.commit("user/setUserInfo",null);
					sessionStorage.clear();
				}
				resolve(response);
			}).catch((err)=>{
				reject(err);
			})
		})
	},
	forgetpwd:(data)=>{
		return post('/api/user/forgetpwd',data)
	},
	checkToken:(data)=>{
		return get('/api/token/check',data)
	},
	getExchangeList:(data)=>{
		return post('/api/exchange/getExchangeList',data)
	},
	getCompanyList:(data)=>{
		return get('/api/company/list',data)
	},
	getCurrencyList:(data)=>{
		return get('/api/exchange/getCurrencyList',data)
	},
	apply:(data)=>{
		return post('/api/user/apply',data)
	},
	remitList:(data)=>{
		return get('/api/remit/index',data)
	},
	getExchangeInfo:(data)=>{
		return get('/api/exchange/getExchangeInfo',data)
	},
	upload:(data)=>{
		return postFile('/api/common/upload',data)
	},
	getUserRelation:(data)=>{
		return get('/api/remit/get_user_relation',data)
	},
	remit:(data)=>{
		return post('/api/remit/add',data)
	},
	remitDel:(data)=>{
		return get('/api/remit/del',data)
	},
	remitInfo:(data)=>{
		return get('/api/remit/info',data)
	},
	remitSetDefault:(data)=>{
		return post('/api/remit/set_default',data)
	},
}