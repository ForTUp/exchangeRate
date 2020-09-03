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
		return post('/api/user/login',data)
	},
	logout:(data)=>{
		return get('/api/user/logout',data)
	},
	forgetpwd:(data)=>{
		return post('/api/user/forgetpwd',data)
	},
}