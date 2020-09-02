const getters = {
	token: state => state.user.token,
	id: state => state.user.id,
	username: state => state.user.username,
	nickname : state => state.user.nickname,
	mobile: state => state.user.mobile,
	avatar: state=> state.user.avatar,
	score: state=> state.user.score,
	userId: state=> state.user.userId,
	createtime: state=> state.user.createtime,
	expiretime: state=> state.user.expiretime,
	expiresIn: state=> state.user.expiresIn,
}
export default getters