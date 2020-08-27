import Vue from 'vue'
import Index from './pages/index/index.vue'
import Login from './pages/login/login.vue'

const routers = [
	{
		path:'/',
		redirect:'/index'
	},
	{
		path: '/index',
		name:'Index',
		component:Index,
	},
	{
		path: '/login',
		name: 'login',
		component:Login
	}
]

export default routers