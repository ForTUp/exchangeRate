import Index from './pages/index/index.vue'
import Vue from 'vue'

const routers = [
	{
		path:'/',
		redirect:'/index'
	},
	{
		path: '/index',
		name:'Index',
		component:Index,
	}
]

export default routers