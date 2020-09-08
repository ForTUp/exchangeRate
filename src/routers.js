import Vue from 'vue'
import Index from './pages/index/index.vue'
import Login from './pages/login/login.vue'
import RetrievePwd from './pages/login/retrievePwd.vue'
import VipApply from './pages/login/vipApply.vue'
import Workbench from './pages/workbench/workbench.vue'
import WorkbenchApply from './pages/workbench/workbenchApply.vue'

const routers = [
	{
		path:'/',
		redirect:'/index'
	},
	{
		path: '/index',
		name:'index',
		component:Index,
	},
	{
		path: '/login',
		name: 'login',
		component:Login
	},
	{
		path:'/retrievePwd',
		name:'retrievePwd',
		component:RetrievePwd
	},
	{
		path:'/vipApply',
		name:'vipApply',
		component:VipApply
	},
	{
		path:'/workbench',
		name:'workbench',
		component:Workbench
	},
	{
		path:'/workbenchApply',
		name:'workbenchApply',
		component:WorkbenchApply
	}
]

export default routers