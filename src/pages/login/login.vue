<template>
		<div id="index">
			<el-container>
				<el-header>
					<el-row :gutter="20">
					<el-col :span="18">
						<div class="grid-content bg-purple ">
							<div class="logoDiv">
								<el-link :underline="false">登录</el-link>
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
									<el-input v-model="form.username" placeholder="请输入ID" ></el-input>
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
export default{
	name:"login",
	data() {
	return {
		form: {
			username: '',
			password: '',
			}
		}
	},
	methods: {
		onSubmit() {
			console.log(this.form);
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
