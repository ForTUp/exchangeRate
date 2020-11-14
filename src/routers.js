import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/index/index.vue'
import Login from './pages/login/login.vue'
import RetrievePwd from './pages/login/retrievePwd.vue'
import VipApply from './pages/login/vipApply.vue'
import Workbench from './pages/workbench/workbench.vue'
import WorkbenchApply from './pages/workbench/workbenchApply.vue'
import Text from './pages/login/text.vue'
import VipApplySuccess from './pages/login/vipApplySuccess.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

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
			title: '首页-温州速汇'
		}
	},
	{
		path: '/login',
		name: 'login',
		component:Login,
		meta: {
			title: '登录-温州速汇'
		}
	},
	{
		path:'/retrievePwd',
		name:'retrievePwd',
		component:RetrievePwd,
		meta: {
			title: '忘记密码-温州速汇'
		}
	},
	{
		path:'/vipApply',
		name:'vipApply',
		component:VipApply,
		meta: {
			title: '会员申请-温州速汇'
		}
	},
	{
		path:'/vipApplySuccess',
		name:'vipApplySuccess',
		component:VipApplySuccess,
		meta: {
			title: '会员申请-温州速汇'
		}
	},
	{
		path:'/workbench',
		name:'workbench',
		component:Workbench,
		meta: {
			title: '工作台-温州速汇'
		}
	},
	{
		path:'/workbenchApply',
		name:'workbenchApply',
		component:WorkbenchApply,
		meta: {
			title: '汇款申请-温州速汇'
		}
	},
	{
		path:'/Text',
		name:'Text',
		component:Text
	}
]

export default routers