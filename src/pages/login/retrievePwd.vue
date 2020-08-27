<template>
		<div id="retrievePwd">
			<el-container>
				<el-header>
					<el-row :gutter="20">
					<el-col :span="16">
						<div class="grid-content bg-purple ">
							<div class="logoDiv">
								<el-link :underline="false" >找回密码</el-link>
							</div>
						</div>
					</el-col>
					  <el-col :span="8">
						<div class="grid-content bg-purple">
							<el-button  class="vipButton" @click="vipApply">会员申请</el-button>
							<el-button  class="loginButton vipButton" @click="loadLogin">登录</el-button>
						</div>
					  </el-col>
					</el-row>
					
				</el-header>
				<el-main>
					<div class="formDiv">
						<div class="headForm">
							<span class="spanMsg">找回密码</span>
						</div>
						<div class="bodyForm">
							<el-form ref="form" :model="form" label-width="28rem">
								<el-form-item >
								</el-form-item>
							  <el-form-item label="账号/User ID：">
									<el-input v-model="form.username" placeholder="请输入ID" ></el-input>
							  </el-form-item>
							  <el-form-item label="手机号码/Phone Number：">
									<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
							  </el-form-item>
							  <el-form-item label="证件类型/ID Type：">
									 <el-select v-model="form.idcord" placeholder="请选择">
									    <el-option
									      v-for="item in options"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>
							  </el-form-item>
							  <el-form-item label="证件号码/ID Number：">
							  		<el-input v-model="form.number" placeholder="请输入证件号码" ></el-input>
							  </el-form-item>
							  <el-form-item>
								<el-button class="sumbitButton" @click="onSubmit">立即找回</el-button>
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
				idcord:'',
				number:''
			},
			options: [{
				  value: '选项1',
				  label: '黄金糕'
				}, {
				  value: '选项2',
				  label: '双皮奶'
				}, {
				  value: '选项3',
				  label: '蚵仔煎'
				}, {
				  value: '选项4',
				  label: '龙须面'
				}, {
				  value: '选项5',
				  label: '北京烤鸭'
			}],
		}
		
	},
	methods: {
		onSubmit() {
			console.log(this.form);
		},
		loadLogin(){
			this.$router.push('/login');
		},
		vipApply(){
			this.$router.push('/vipApply');
		}
		
	}
}	
</script>

<style scoped>
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
		 height: 45rem !important;
	}
	body > .el-container {
		width: 62.5rem;
		
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
		font-size: 0.75rem;
	}
	.el-form-item__content{
		margin-left: 2.5rem !important;
		font-size: 0.75rem;
		
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
		margin: 0 1rem;
		border-radius:0.125rem !important;
		width: 5rem;

	}
	.vipButton > span{
		text-align: center;
		margin-left: -0.6rem;
	}
	
	.loginButton{
		background-color: #169bd5 !important;
		color: #fff;
	}
	.loginButton > span{
		text-align: center;
		margin-left: 0rem;
	}
	
	.loginButton:hover{
		color:#fff ;
	}
	
	.logoDiv{
		margin-left: 1rem;
		height: 3.75rem;
		width: 3.75rem;
	}
</style>
