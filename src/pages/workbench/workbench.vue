<template>
		<div id="workbench">
			<el-container>
				<el-header>
					<el-row >
						<el-col :span="20">
							<div class="grid-content bg-purple ">
								<div class="logoDiv">
									<el-image class="topImage"
									      :src="imageUrl"
									      :fit="fit"></el-image>
									<el-link :underline="false" class="topLink">工作台</el-link>
								</div>
							</div>
						</el-col>
						  <el-col :span="4">
						<div class="grid-content bg-purple">
							<span class="loginSpan">曹操</span>
							<el-button  class="exitBtn" click="loadLogin">退出</el-button>
						</div>
					  </el-col>
					</el-row>
				</el-header>
				<el-main>
					<div class="formDiv">
						<el-form ref="form" :model="form" label-width="19rem">
							<div class="returnDiv">
								<el-button class="returnBtn">返回</el-button>
							</div>
							
							<div class="bodyForm">
								<div class="headForm">
									<span class="spanMsg">汇款人 | Sender detail</span>
								</div>
								<el-row class="formRadioHead">
									<el-col>
										<el-radio v-model="radio" label="1">本人 默认汇款人</el-radio>
									</el-col>
								</el-row >
								<el-row  class="formRadioHead">
									<el-col>
										<el-radio v-model="radio" label="2">添加汇款人</el-radio>
									</el-col>
								</el-row>
							</div>
							<div class="bodyForm bodyFormNext">
								<div class="headForm">
									<span class="spanMsg">汇款明细 | Transaction detail</span>
								</div>
								<el-row  :gutter="24"></el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="*汇款类型/Type："  class="labelName">
											<div class="formRadio">
												<el-radio v-model="form.radio" label="1">买入货币</el-radio>
												<el-radio v-model="form.radio" label="2">卖出货币</el-radio>
											</div>
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
											  v-for="item in idcord"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="6">
										<el-form-item label="*资金来源/Soure of fund："  class="labelName">
											<el-checkbox-group v-model="checkList" class="checkForm">
											    <el-checkbox label="生意/Business" class="checkboxSpan"></el-checkbox>
											    <el-checkbox label="借款/Loan" class="checkboxSpanNext"></el-checkbox>
											    <el-checkbox label="工资/Salary" class="checkboxSpanNext"></el-checkbox>
												<el-checkbox label="个人存款/Personal Saving" class="checkboxSpanNext"></el-checkbox>
											  </el-checkbox-group>
										</el-form-item>
									</el-col>
									
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="6">
										<el-form-item label="*资金用途/Purpose of the transfer："  class="labelName">
											<el-checkbox-group v-model="checkList" class="checkForm">
											    <el-checkbox label="生意/Business" class="checkboxSpan"></el-checkbox>
											    <el-checkbox label="家用/Fmaliy support" class="checkboxSpanNext"></el-checkbox>
											    <el-checkbox label="还款/Repayment" class="checkboxSpanNext"></el-checkbox>
												<el-checkbox label="其他 _________________" class="checkboxSpanNext"></el-checkbox>
											  </el-checkbox-group>
										</el-form-item>
									</el-col>
									
								</el-row>
							</div>
							
							<div class="bodyForm bodyFormNext">
								<div class="headForm">
									<span class="spanMsg">接收人 | Payee detail</span>
								</div>
								<el-row  :gutter="24"></el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<div class="textBtn" >
											<el-link type="primary"  :underline="false">添加接收人</el-link>
										</div>
									</el-col>
								</el-row>
							</div>
							<div class="formSubmitBtn">
								<el-button  class="submitBtn" >提交</el-button>
							</div>
							
						</el-form>
					</div>
					
				</el-main>
			</el-container>
		</div>
</template>

<script>
export default{
	name:"workbench",
	data() {
		return {
			form: {
				username: '',
				password: '',
				idcord:'',
				number:'',
				radio: '1',
				expirationDate:'',
				imageUrl:''
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
			imageUrl:require('../../static/image/u95.png'),
			radio:'',
			checkList:[]
		}
		
	},
	methods: {
		onSubmit() {
			console.log(this.form);
		},
		loadLogin(){
			this.$router.push('/login');
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
				return isJPG && isLt2M;
		},
		handleReset () { // 清除
		  this.$refs.esign.reset()
		},
		handleGenerate () { // 获取base64
		  var _this = this
		  _this.$refs.esign.generate().then(res => {
			// 转成文件
			var blob = _this.dataURLtoBlob(res)
			var tofile = _this.blobToFile(blob, '签名.jpg')
			console.log(tofile)
			setTimeout(async () => {
			  const formData = new FormData()
			  formData.append('file', tofile, tofile.name)
			  formData.append('fileType', 9)
			  // ajax 请求
			})
		  }).catch(err => {
			_this.$toast(err) // 画布没有签字时会执行这里 'Not Signned'
		  })
		},
		// 将base64转换为blob
		dataURLtoBlob (dataurl) {
		  var arr = dataurl.split(',')
		  var mime = arr[0].match(/:(.*?);/)[1]
		  var bstr = atob(arr[1])
		  var n = bstr.length
		  var u8arr = new Uint8Array(n)
		  while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		  }
		  return new Blob([u8arr], { type: mime })
		},
		// 将blob转换为file
		blobToFile (theBlob, fileName) {
		  theBlob.lastModifiedDate = new Date()
		  theBlob.name = fileName
		  return theBlob
		},
		
		
	}
}	
</script>

<style scoped lang="scss">
	body > .el-container {
		width: 82rem;
	}
	.el-header, .el-footer {
		width: 82rem;
		
	}
	.el-main {
		width: 82rem;
	}
	
	.formDiv {
		border-radius: 1px;
		background-color: #F7F7F7;
		width:  78rem;
		height: 135rem !important;
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
	
	.exitBtn{
		margin-right: -91rem;
		margin-top: 1rem;
		border: 0.0625rem #02a7f0 solid;
		color: #02a7f0;
	}
	.loginSpan{
		font-size: 1rem;
		margin-right: 2rem;
	}
	.el-input{
		width: 18rem;
		margin-left: -1rem;
	}
	.formAddr{
		width: 37.5rem;
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
		margin-left: -6rem;
	}
	.formSpan {
		position: absolute;
		top:3rem;
		color: #AAAAAA;
		width: 2rem;
		height: 3rem;
		margin-left: -1.25rem;
	}
	
	
	.imgUpload {
		margin-left: 6rem;
		margin-top: 2.5rem;
	}
	.vueEsign{
		border: 0.0625rem solid #F7F7F7;
		width: 30rem !important;
		height: 20rem !important;
		background-color: #F7F7F7 !important;
		margin-left: 1rem;
		margin-top: 1rem;
	}
	.esignBtn{
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.esignFormDiv{
		padding-bottom: 0.5rem;
	}
	.checkBtn{
		color:  #02A7F0;
	}
	.checkDiv{
		margin-top: 1.5rem;
		margin-bottom: 1rem;
		margin-left: 0;
		text-align: left;
		font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
		font-size: 14px;
	}
	.formSubmitBtn{
		float: left;
		margin-top: 1rem;
		margin-left: 68rem;
	}
	.submitBtn{
		width: 10rem;
		background-color: #169bd5 !important;
		color: #fff;
	}
	
	.returnDiv{
		margin-top: -1rem;
		margin-bottom: 1rem;
		width: 20rem;
		height: 3rem;
		text-align: left;
	}
	
	.formRadioHead{
		width: 20rem;
		height: 2rem;
		text-align: left;
		margin-left: 2rem;
		margin-top: 1rem;
	}
	.checkForm{
		text-align: left;
		float: left;
		width: 84rem;
	}
	.checkboxSpan{
		margin-left: -1rem;
		width:18rem;
		padding: 0;
	}
	.checkboxSpanNext{
		width: 18rem;
		margin-left:-0.5rem;
	}
	.textBtn{
		width: 20rem;
		height: 4rem;
		text-align: left;
		line-height: 4rem;
		padding-left: 2rem;
	}
</style>
