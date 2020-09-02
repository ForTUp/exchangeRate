import Cookies from 'js-cookie'

const TokenKey = 'token'  //APPMGRID这个token名字自己定义

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
