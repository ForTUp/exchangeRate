import {post,get} from './http.js'

export default {
	getConfig:(data)=>{
		return new Promise((resolve, reject) => {
			get('/api/category/getConfig',data).then((response)=>{
				let {data} = response;
				let array = new Array();
				for(var item in data){
					var map = new Map();
					map.value = item;
					map.label = data[item];
					array.push(map)
				}
				 resolve(array);
			}).catch((err)=>{
				 reject(err);
			})
		})
	},
	
	login:(data)=>{
		return new Promise((resolve, reject) => {
			post('/api/user/login',data).then((response)=>{
				 resolve(response);
			}).catch((err)=>{
				 reject(err);
			})
		})
	},
	logout:(data)=>{
		return new Promise((resolve, reject) => {
			get('/api/user/logout',data).then((response)=>{
				 resolve(response);
			}).catch((err)=>{
				 reject(err);
			})
		})
	},
	forgetpwd:(data)=>{
		return new Promise((resolve, reject) => {
			post('/api/user/forgetpwd',data).then((response)=>{
				 resolve(response);
			}).catch((err)=>{
				 reject(err);
			})
		})
	},
}