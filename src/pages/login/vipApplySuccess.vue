<template>
		<div id="retrievePwd">
			<el-container>
				<el-header>
					<el-row :gutter="20"  style="margin-left: 9rem;">
					<el-col :span="16">
						<div class="grid-content bg-purple ">
							<div class="logoDiv">
								<div @click="goToIndex" style="cursor: pointer;">
								<el-image class="topImage"
								      :src="imageUrl"
								      :fit="fit"></el-image>
								</div>
								<el-link :underline="false" class="topLink">会员申请</el-link>
							</div>
						</div>
					</el-col>
					  <el-col :span="8">
						<div class="grid-content bg-purple">
							<el-button  class="loginButton vipButton" @click="loadLogin">登录</el-button>
						</div>
					  </el-col>
					</el-row>
					
				</el-header>
				<el-main>
					<div class="headSpan">
						<div><i class="el-icon-success"></i></div>
						<div><span>申请资料提交成功，等待审核，预计1-3个工作日！</span></div>
					</div>
					<div class="formDiv">
						<div class="headForm">
							<span class="text">您的账号和初始密码：</span>
						</div>
						<div class="bodyForm">
							<el-form ref="form" :model="form" label-width="28rem">
								<el-form-item >
								</el-form-item>
							  <el-form-item label="账号/Account：">
									<el-input v-model="form.username"    :readonly="true"></el-input>
							  </el-form-item>
							  <el-form-item label="初始密码/Initial Password：">
									<el-input v-model="form.password"   :readonly="true"></el-input>
							  </el-form-item>
							  <el-form-item >
							  </el-form-item>
							</el-form>
						</div>
					</div>
					
				</el-main>
			</el-container>
			
		</div>
</template>

<script>
export default{
	name:"retrievePwd",
	data() {
		return {
			form: {
				username: '',
				password: '',
			},
			imageUrl:require('../../static/image/u95.png'),
			fit : '',
		}
		
	},
	methods: {
		loadLogin(){
			this.$router.push('/login');
		},
		goToIndex(){
			this.$router.push('/index');
		}
		
	},
	mounted:function () {
		if (Object.keys(this.$route.params).length==0) {
			this.$message({
				message: "请先注册！",
				type: 'warning'
			})
			this.$router.push('/vipApply');
		}
		this.form.username = this.$route.params.username;
		this.form.password = this.$route.params.password;
	},
}	
</script>

<style scoped lang="scss">
	@import "../../static/css/form-item.css";  //引入方式
	.vipButton{
		border: 0.0625rem #02a7f0 solid;
		color: #02a7f0;
		margin: 0 1rem;
		border-radius:0.125rem !important;
		width: 5rem;
		padding: 0.75rem 0.625rem;

	}
	.el-input{
		width: 25rem;
		margin-left: -2rem !important;
		
	}
	.el-input__inner{
		border-radius:0.125rem !important;
		text-align: center;
	}
	.el-select {
		width: 25rem !important;
		margin-left: -2rem !important;
	}
	.vipButton span{
		text-align: center;
		margin-left: -0.6rem;
	}
	
	.loginButton{
		background-color: #169bd5 !important;
		color: #fff;
	}
	.loginButton span{
		text-align: center;
		margin-left: 0rem;
	}
	
	.loginButton:hover{
		color:#fff ;
	}
	.headSpan{
		height: 10rem;
		width: 60%;
		margin: 0 auto;
		font-size: 2rem;
		text-align: center;
		line-height: 5rem;
		margin-bottom: 2rem;
		.el-icon-success{
			font-size: 5rem;
			color:green;
		}
		span{
		}

	}
	.headForm{
		text-align: center;
	}
	
</style>
