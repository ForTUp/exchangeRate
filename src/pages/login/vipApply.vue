<template>
		<div id="vipApply">
			<el-container>
				<el-header>
					<el-row >
						<el-col :span="20">
							<div class="grid-content bg-purple ">
								<div class="logoDiv">
									<el-image class="topImage"
									      :src="imageUrl"
									      :fit="fit"></el-image>
									<el-link :underline="false" class="topLink">会员申请</el-link>
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
								<el-row  :gutter="24">
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
								<el-row :gutter="24">
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
								</el-row>
								<el-row  :gutter="24">
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
								<el-row  :gutter="24">
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
								<el-row  :gutter="18">
									<el-col :span="12">
										<el-form-item label="证件类型/ID Type："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" class="formAddr"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6" :push="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
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
								<el-row  :gutter="24"></el-row>
								<el-row  :gutter="24">
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
								<el-row  :gutter="18">
									<el-col :span="6">
										<el-form-item label="*护照照片/Passport Photo："  class="labelName">
											<el-upload 
											  class="avatar-uploader "
											  action="https://jsonplaceholder.typicode.com/posts/"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
											</el-upload>
										</el-form-item>
									</el-col>
									<el-col :span="6" class="imgUpload">
										<el-form-item label=""  class="labelName">
											<el-upload 
											  class="avatar-uploader "
											  action="https://jsonplaceholder.typicode.com/posts/"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
											</el-upload>
											</el-form-item>
									</el-col>
									
								</el-row>
							</div>
							
							<div class="bodyForm bodyFormNext">
								<div class="headForm">
									<span class="spanMsg">客户证件 | Customer identification（2）</span>
								</div>
								<el-row  :gutter="24"></el-row>
								<el-row  :gutter="24">
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
										<el-form-item label="手机号码/Phone Number："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件有效期/Date of expiration："  class="labelName">
										 <el-date-picker
										       v-model="form.expirationDate"
										       type="date"
										       placeholder="选择日期">
										 </el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件号码/ID Number："  class="labelName"> 
											<el-input v-model="form.number" placeholder="请输入证件号码" ></el-input>
										</el-form-item>
									</el-col>
									
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="6">
										<el-form-item label="*护照照片/Passport Photo："  class="labelName">
											<el-upload 
											  class="avatar-uploader "
											  action="https://jsonplaceholder.typicode.com/posts/"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
											</el-upload>
										</el-form-item>
									</el-col>
									<el-col :span="6" class="imgUpload">
										<el-form-item label=""  class="labelName">
											<el-upload 
											  class="avatar-uploader "
											  action="https://jsonplaceholder.typicode.com/posts/"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
											</el-upload>
											</el-form-item>
									</el-col>
									<el-col :span="6" class="imgUpload">
										<el-form-item label=""  class="labelName">
											<el-upload 
											  class="avatar-uploader "
											  action="https://jsonplaceholder.typicode.com/posts/"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
											</el-upload>
											</el-form-item>
									</el-col>
									
								</el-row>
							</div>
							
							<div class="bodyForm bodyFormNext esignFormDiv">
								<div class="headForm">
									<span class="spanMsg">客户签名 | Customer sign</span>
								</div>
								<vue-esign ref="esign"
									   :isCrop="isCrop"
									   :lineWidth="lineWidth"
									   :lineColor="lineColor"
									   :bgColor.sync="bgColor" 
									   class="vueEsign"/>
								<el-row  :gutter="24" class="esignBtn">
									<el-col :span="6" :pull="12">
										<div class="btn">
											<el-button  class="vipButton" @click="handleReset">重置</el-button>
											<el-button  class="loginButton vipButton" @click="handleGenerate">确定</el-button>
										</div>
									</el-col>
								</el-row>	
								<!-- <el-row :gutter="24"  class="esignBtn"></el-row> -->
							</div>
							<div class="checkDiv">
								<el-checkbox v-model="checked">我已阅读并同意<span class="checkBtn">《隐私保护政策条款》</span>，并确认上述信息和提供的文件真实无误。</el-checkbox>
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
	name:"vipApply",
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
		margin-left: -12rem;
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
	
	
</style>
