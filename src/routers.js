import Vue from 'vue'
import Index from './pages/index/index.vue'
import Login from './pages/login/login.vue'
import RetrievePwd from './pages/login/retrievePwd.vue'
import VipApply from './pages/login/vipApply.vue'
import Workbench from './pages/workbench/workbench.vue'
import WorkbenchApply from './pages/workbench/workbenchApply.vue'
import Text from './pages/login/text.vue'

const routers = [
	{
		path:'/',
		redirect:'/index',
	},
	{
		path: '/index',
		name:'index',
		component:Index,
		meta: {
			title: '首页'
		}
	},
	{
		path: '/login',
		name: 'login',
		component:Login,
		meta: {
			title: '登录'
		}
	},
	{
		path:'/retrievePwd',
		name:'retrievePwd',
		component:RetrievePwd,
		meta: {
			title: '忘记密码'
		}
	},
	{
		path:'/vipApply',
		name:'vipApply',
		component:VipApply,
		meta: {
			title: '会员申请'
		}
	},
	{
		path:'/workbench',
		name:'workbench',
		component:Workbench,
		meta: {
			title: '工作台'
		}
	},
	{
		path:'/workbenchApply',
		name:'workbenchApply',
		component:WorkbenchApply,
		meta: {
			title: '汇款申请'
		}
	},
	{
		path:'/Text',
		name:'Text',
		component:Text
	}
]

export default routers