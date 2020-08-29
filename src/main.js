import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import Qs from 'qs'
import App from './App.vue'
import VueRouter from 'vue-router'
import routers from './routers'
import "@/static/css/common.scss";
import vueEsign from 'vue-esign'

//Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;		//$axios：在需要axios的vue文件中引用axios的别名，比如this.$axios.post()...
									//如果写成Vue.prototype.$http = axios,那么要改成this.$http.post()...
Vue.prototype.qs = Qs;	

Vue.use(VueRouter)	;	 //使用路由1
Vue.use(vueEsign) ; //vue 使用 canvas 实现手写电子签名功能
const router = new VueRouter({
	mode: 'history',
	routes: routers
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

