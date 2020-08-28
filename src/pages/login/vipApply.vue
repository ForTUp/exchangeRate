<template>
		<div id="vipApply">
			<el-container>
				<el-header>
					<el-row >
						<el-col :span="20">
							<div class="grid-content bg-purple ">
								<div class="logoDiv">
									<el-link :underline="false">会员申请</el-link>
								</div>
							</div>
						</el-col>
						  <el-col :span="4">
						<div class="grid-content bg-purple">
							<el-button  class="loginButton " @click="loadLogin">登录</el-button>
						</div>
					  </el-col>
					</el-row>
				</el-header>
				<el-main>
					<div class="formDiv">
						<el-form ref="form" :model="form" label-width="19rem">
							<div class="bodyForm">
								<div class="headForm">
									<span class="spanMsg">客户资料 | Customer detail</span>
								</div>
								<el-row></el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item class="labelName" label="账号/User ID：" >
											<el-input v-model="form.username" placeholder="请输入ID" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="手机号码/Phone Number："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
											<div class="formRadio">
											<el-radio v-model="form.radio" label="1">男</el-radio>
											<el-radio v-model="form.radio" label="2">女</el-radio>
											</div>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件号码/ID Number："  class="labelName"> 
												<el-input v-model="form.number" placeholder="请输入证件号码" ></el-input>
										</el-form-item>
									</el-col>
									
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item class="labelName" label="账号/User ID：" >
											<el-input v-model="form.username" placeholder="请输入ID" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="手机号码/Phone Number："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
										 <el-select v-model="form.idcord" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in options"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
										 <el-select v-model="form.idcord" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in idcord"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<div class="formSpan">-</div>
										<el-form-item label="手机号码/Phone Number："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
										 <el-select v-model="form.idcord" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in idcord"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<div class="formSpan">-</div>
										<el-form-item label="证件号码/ID Number："  class="labelName"> 
											<el-input v-model="form.number" placeholder="请输入证件号码" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<!-- <el-row>
									<el-col :span="24">
										<el-form-item>
											<el-button class="sumbitButton" @click="onSubmit">立即找回</el-button>
										</el-form-item>
									</el-col>
								</el-row> -->
							</div>
							<div class="bodyForm bodyFormNext">
								<div class="headForm">
									<span class="spanMsg">客户证件 | Customer identification（1）</span>
								</div>
								<el-row></el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item class="labelName" label="账号/User ID：" >
											<el-input v-model="form.username" placeholder="请输入ID" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="手机号码/Phone Number："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
											<div class="formRadio">
											<el-radio v-model="form.radio" label="1">男</el-radio>
											<el-radio v-model="form.radio" label="2">女</el-radio>
											</div>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件号码/ID Number："  class="labelName"> 
												<el-input v-model="form.number" placeholder="请输入证件号码" ></el-input>
										</el-form-item>
									</el-col>
									
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item class="labelName" label="账号/User ID：" >
											<el-input v-model="form.username" placeholder="请输入ID" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="手机号码/Phone Number："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
										 <el-select v-model="form.idcord" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in options"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
										 <el-select v-model="form.idcord" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in idcord"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<div class="formSpan">-</div>
										<el-form-item label="手机号码/Phone Number："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
										 <el-select v-model="form.idcord" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in idcord"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<div class="formSpan">-</div>
										<el-form-item label="证件号码/ID Number："  class="labelName"> 
											<el-input v-model="form.number" placeholder="请输入证件号码" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<!-- <el-row>
									<el-col :span="24">
										<el-form-item>
											<el-button class="sumbitButton" @click="onSubmit">立即找回</el-button>
										</el-form-item>
									</el-col>
								</el-row> -->
							</div>
						</el-form>
					</div>
					
				</el-main>
			</el-container>
		</div>
</template>

<script>
export default{
	name:"vipApply",
	data() {
		return {
			form: {
				username: '',
				password: '',
				idcord:'',
				number:'',
				radio: '1'
			},
			options: [
				{
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
			idcord: [
				{
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
		}
		
	},
	methods: {
		onSubmit() {
			console.log(this.form);
		},
		loadLogin(){
			this.$router.push('/login');
		},
		
		
	}
}	
</script>

<style scoped lang="scss">
	body > .el-container {
		width: 80rem;
	}
	.el-header, .el-footer {
		width: 80rem;
	}
	.el-main {
		width: 80rem;
	}
	
	.formDiv {
		border-radius: 1px;
		background-color: #F7F7F7;
		width:  78rem;
		height: 38rem;
		margin: 1rem  auto ;
		
	}
	.headForm{
		background-color: #FFF;
		width:  78rem;
		height: 3.75rem;
		margin:0 auto;
		border:0.0625rem solid #e9e9e9 ;
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
	.bodyFormNext{
		margin-top:1rem;
	}
	
	.loginButton{
		background-color: #169bd5 !important;
		color: #fff;
		margin-right: -85rem;
	}
	.loginButton span{
		text-align: center;
		margin-left: 0rem;
	}
	
	.loginButton:hover{
		color:#fff ;
	}
	.el-input{
		width: 18rem;
		margin-left: -1rem;
	}
	.el-input__inner{
		width: 18rem !important;
	}
	
	.el-select {
		width: 18rem !important;
		margin-left: -1rem;
	}
	.labelName  {
		font-size: 0.5rem !important;
		margin-left: -1rem;
	}
	.el-col {
		width: 19.5rem;
		
	}
	.formRadio{
		margin-left: -12rem;
	}
	.formSpan {
		position: absolute;
		top:3rem;
		color: #AAAAAA;
	}
</style>
