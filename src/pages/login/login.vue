<template>
		<div id="index">
			<el-container>
				<el-header>
					<el-row :gutter="20">
					<el-col :span="18">
						<div class="grid-content bg-purple ">
							<div class="logoDiv">
								<el-image class="topImage"
								      :src="imageUrl"
								      :fit="fit"></el-image>
								<el-link :underline="false" class="topLink">登录</el-link>
							</div>
						</div>
					</el-col>
					  <el-col :span="4">
						<div class="grid-content bg-purple">
							<el-button  class="vipButton" @click="vipApply">会员申请</el-button>
						</div>
					  </el-col>
					</el-row>
					
				</el-header>
				<el-main>
					<div class="formDiv">
						<div class="headForm">
							<span class="spanMsg">登录 | Login</span>
						</div>
						<div class="bodyForm">
							<el-form ref="form" :model="form" label-width="28rem">
								<el-form-item >
								</el-form-item>
							  <el-form-item label="账号/User ID：">
									<el-input v-model="form.account" placeholder="请输入ID" ></el-input>
							  </el-form-item>
							  <el-form-item label="密码/Password：">
									<el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
							  </el-form-item>
							  <el-form-item>
								<el-button class="sumbitButton" @click="onSubmit">登录/Login</el-button>
							  </el-form-item>
							  <el-form-item >
							  </el-form-item>
							</el-form>
						</div>
						<div class="bottomForm"><el-link href="retrievePwd">忘记密码？</el-link></div>
					</div>
					
				</el-main>
			</el-container>
		</div>
</template>

<script>
import { getToken, setToken, removeToken } from '../../utils/token.js'   //引入auth.js
	
export default{
	name:"login",
	data() {
		return {
			form: {
				account: '',
				password: '',
			},
			imageUrl:require('../../static/image/u95.png'),
		}
	},
	methods: {
		onSubmit() {
			let params = this.qs.stringify(this.form)
			let that = this;
			console.log(params);
			this.$api.login(params).then((response) => {
				console.log(response.data)
				const {data} = response;
				if(response.code>0){
					that.$store.commit("user/SET_USER_ID",data.userinfo.user_id);
					that.$store.commit("user/SET_TOKEN",data.userinfo.token);
					that.$store.commit("user/SET_USER_NAME",data.userinfo.username);
					that.$store.commit("user/SET_MOBILE",data.userinfo.mobile);
					that.$store.commit("user/SET_NICKNAME",data.userinfo.nickname);
					that.$store.commit("user/SET_AVATER",data.userinfo.avatar);
					that.$store.commit("user/SET_SCORE",data.userinfo.score);
					that.$store.commit("user/SET_REMIND_COUNT",data.userinfo.remind_count);
					that.$store.commit("user/SET_CREATETIME",data.userinfo.createtime);
					that.$store.commit("user/SET_EXPIRETIME",data.userinfo.expiretime);
					that.$store.commit("user/SET_EXPIRESIN",data.userinfo.expires_in);
					setToken(data.userinfo.token);
					that.$message({
					  message: response.msg,
					  type: 'success'
					});
					that.$router.push('/');
				}else{
					 this.$message({
					  message: response.msg,
					  type: 'warning'
					});
				}
			}).catch(function(err){
				console.log(err)
			})
		},
		vipApply(){
			this.$router.push('/vipApply');
		}
		
	}
}	
</script>

<style scoped lang="scss">
	
	.formDiv {
		border-radius: 1px;
		background-color: #F7F7F7;
		width:  28rem;
		height: 28rem;
		margin: 1rem   auto;
		
	}
	.el-input{
		width: 25rem;
		margin-left: -2rem !important;
		
	}
	.el-input__inner{
		border-radius:0.125rem !important;
		text-align: center;
	}
</style>
