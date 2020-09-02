<template>
		<div id="retrievePwd">
			<el-container>
				<el-header>
					<el-row :gutter="20">
					<el-col :span="16">
						<div class="grid-content bg-purple ">
							<div class="logoDiv">
								<el-image class="topImage"
								      :src="imageUrl"
								      :fit="fit"></el-image>
								<el-link :underline="false" class="topLink">找回密码</el-link>
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
				  label: 'Driver‘s license'
				}, {
				  value: '选项2',
				  label: 'Photo ID'
				}, {
				  value: '选项3',
				  label: 'Identity card'
				}, {
				  value: '选项4',
				  label: 'Credit / debit card',
				},
			],
			imageUrl:require('../../static/image/u95.png'),
		}
		
	},
	methods: {
		onSubmit() {
			console.log(this.form);
			let params = this.qs.stringify(this.form)
			this.$post('/api/user/forgetpwd',params).then((response)=>{
				console.log(response);
				if(response.code>0){
					that.$message({
					  message: response.msg,
					  type: 'success'
					});
					that.$router.push('/login');
				}else{
					this.$message({
					  message: response.msg,
					  type: 'warning'
					});
				}
			}).catch((err)=>{
				
			})
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

<style scoped lang="scss">
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
	
</style>
