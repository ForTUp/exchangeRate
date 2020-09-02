import http from '../../utils/http.js'
import { getToken, setToken, removeToken } from '../../utils/token.js'   //引入auth.js

const state = {
  token: getToken() ,
  id: '',
  username: '',
  nickname : '',
  mobile:'',
  avatar:'',
  score:'',
  userId: '',
  createtime:'',
  expiretime: '',
  expiresIn:'',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_USER_NAME: (state, username) => {
    state.username = username
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATER: (state, avatar) => {
    state.avatar = avatar
  },
  SET_SCORE: (state, score) => {
    state.score = score
  },
  SET_REMIND_COUNT: (state, remind_count) => {
    state.remind_count = remind_count
  },
  SET_CREATETIME: (state, createtime) => {
    state.createtime = createtime
  },
  SET_EXPIRETIME: (state, expiretime) => {
    state.expiretime = expiretime
  },
  SET_EXPIRESIN: (state, expiresIn) => {
    state.expiresIn = expiresIn
  }
}

export default {
	namespaced:true,
	state,
	mutations,
}