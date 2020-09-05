const getters = {
	token:state => state.user.token,
	userId:state => state.user.userId,
	userInfo:state => {
		if (typeof state.user.userInfo == 'string'){
			return JSON.parse(state.user.userInfo)
		} else {
			return state.user.userInfo
		}
	}
}
export default getters