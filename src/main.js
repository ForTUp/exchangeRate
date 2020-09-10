import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'
import App from './App.vue'
import VueRouter from 'vue-router'
import routers from './routers'
import "@/static/css/common.scss";
import vueEsign from 'vue-esign'
import store from "./store";
import {post,get,postJson} from "./utils/http.js"
import api from "./utils/api.js"
import { getToken, setToken, removeToken } from './utils/token.js'   //引入auth.js
import './assets/icon/iconfont.css';
import BaiduMap from 'vue-baidu-map';
import moment from 'moment'
 
Vue.use(require('vue-moment'));
Vue.prototype.moment = moment;
Vue.filter('dateYMDHMSFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dateStr).format(pattern);
})

Vue.use(BaiduMap, {
 ak: 'F47hrcVkdz2MW5aoDkXpt42dHtRqnieG'
})
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$api = api;
Vue.prototype.$postJson = postJson;
Vue.prototype.$getToken = getToken;
Vue.prototype.$setToken = setToken;
Vue.prototype.$removeToken = removeToken;
//Vue.config.productionTip = false
Vue.use(ElementUI);
//Vue.prototype.$axios = axios;		//$axios：在需要axios的vue文件中引用axios的别名，比如this.$axios.post()...
									//如果写成Vue.prototype.$http = axios,那么要改成this.$http.post()...
Vue.prototype.qs = qs;
Vue.use(VueRouter)	;	 //使用路由1
Vue.use(vueEsign) ; //vue 使用 canvas 实现手写电子签名功能
const router = new VueRouter({
	mode: 'history',
	routes: routers
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

