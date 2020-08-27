<template>
		<div id="index">
			<el-container>
				<el-header>
					<el-row :gutter="20">
					<el-col :span="18">
						<div class="grid-content bg-purple ">
							<div class="logoDiv">
								<el-link >登录</el-link>
							</div>
						</div>
					</el-col>
					  <el-col :span="4">
						<div class="grid-content bg-purple">
							<el-button  class="vipButton">会员申请</el-button>
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
							<el-form ref="form" :model="form" label-width="8rem">
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
						<div class="bottomForm"><el-link>忘记密码？</el-link></div>
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
		}
	}
}	
</script>

<style>
	body{
		width: 62.5rem;
		margin: 0 auto;
		border: 0.0625rem solid #F7F7F7;
		font-family: 'ArialMT', 'Arial', sans-serif;
		border-radius:0rem;
	}
	.el-header, .el-footer {
		color: #333;
		text-align: center;
		line-height: 3.75rem;
		width: 62.5rem;
	}
	.el-main {
		 width: 62.5rem;
		 background-color: #F7F7F7;
		 color: #333;
		 text-align: center;
	}
	body > .el-container {
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 16.25rem;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 20rem;
	}
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 18.75rem;
		margin: 0;
	}
	
	.el-form-item__label{
		margin-left:2rem;
		text-align: left;
		float:left;
		font-weight: 600;
	}
	.el-form-item__content{
		margin-left: 2.5rem !important;
		
	}
	.el-input{
		width: 25rem;
		margin-left: -2rem !important;
	}
	.el-input__inner{
		border-radius:0.125rem !important;
	}
	.formDiv {
		border-radius: 1px;
		background-color: #F7F7F7;
		width:  28rem;
		height: 22rem;
		margin: 6.25rem   auto;
		
	}
	.headForm{
		background-color: #FFF;
		width:  28rem;
		height: 3.75rem;
		margin:0 auto;
		border:0.0625rem none #695D69 ;
		text-align:left;
		line-height: 3.75rem;
	}
	.spanMsg{
		margin-left: 0.5rem;
		font-weight: 800;
	}
	.bodyForm{
		margin-top: 0.125rem;
		background-color: #FFF;
		margin-bottom: 0.125rem;
	}
	.bottomForm{
		height: 5rem;
		text-align: center;
	}
	.sumbitButton{
		background-color: #169bd5 !important;
		width: 25rem !important;
		margin-left: -2rem;
		color: #fff;
		border-radius:0.125rem !important;
		
	}
	
	.sumbitButton:hover{
		color:#fff ;
	}
	.vipButton{
		border: 0.0625rem #02a7f0 solid;
		color: #02a7f0;
		margin-right: -10rem;
		border-radius:0.125rem !important;
	}
	
	.logoDiv{
		margin-left: 1rem;
		height: 3.75rem;
		width: 3.75rem;
	}
</style>
