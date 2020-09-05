import http from '../../utils/http.js'
import { getToken, setToken, removeToken } from '../../utils/token.js'   //引入auth.js


const state = {
  token: sessionStorage.getItem('token'),
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
  userId: sessionStorage.getItem('userId')
}

const mutations = {
  setToken: (state, token) => {
    state.token = token;
	sessionStorage.setItem('token',token);
  },
  setUserId: (state, userId) => {
    state.userId = userId;
	sessionStorage.setItem('userId',userId);
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = JSON.parse(userInfo);
	sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
  },
}

// const actions = {
//   // 登录
//   handleLogin({ commit }, { userName, password }) {
//    commit('setUserId', userinfo.id)
//    commit('setUserName', userinfo.username)
//    commit('setToken', userinfo.token)
//    commit('setEmail', userinfo.email)
//   },
//   // 退出登录
//   handleLogOut() {
//    sessionStorage.removeItem("id")
//    sessionStorage.removeItem("username")
//    sessionStorage.removeItem("token")
//   }
//  }


export default {
	namespaced:true,
	state,
	mutations,
	// actions
}