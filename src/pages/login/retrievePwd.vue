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
									      v-for="item in idtype"
									      :key="item.id"
									      :label="item.name"
									      :value="item.id">
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
			
			<el-dialog
			  title="找回密码"
			  :visible.sync="dialogVisible"
			  width="30%"
			 >
			  <span>{{msg}}</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="loadLogin">确 定</el-button>
			  </span>
			</el-dialog>
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
			idtype: [],
			imageUrl:require('../../static/image/u95.png'),
			fit : '',
			dialogVisible: false,
			msg:''
		}
		
	},
	methods: {
		onSubmit() {
			let params = this.qs.stringify(this.form)
			this.$api.forgetpwd(params).then((response)=>{
				if(response.code>0){
					this.dialogVisible = true;
					this.msg = '你密码已经成功重置为' + response.data.password +'请妥善保管';
				}else{
					this.$confirm('您提交的信息验证不通过，请重新提交！', '找回密码', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning',
					  center: true
					}).then(() => {
					}).catch(() => {
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
		
	},
	mounted() {
		this.$api.getConfig({type:'idtype'}).then((response)=>{
			console.log(response)
			this.idtype = response;
		})
	}
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
	
</style>
