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
							<el-button  class="loginButton loginButtonTop" @click="loadLogin">登录</el-button>
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
										<el-form-item class="labelName" label="名/First Name：：" >
											<el-input v-model="form.username" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="姓/Last Name："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="性别/Gender："  class="labelName">
											<div class="formRadio">
											<el-radio v-model="form.radio" label="1">男</el-radio>
											<el-radio v-model="form.radio" label="2">女</el-radio>
											</div>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="*出生年月/Date of birth："  class="labelName"> 
											<el-date-picker
												  v-model="form.expirationDate"
												  type="date"
												  placeholder="选择日期">
											</el-date-picker>
										</el-form-item>
									</el-col>
									
								</el-row>
								<el-row :gutter="24">
									<el-col :span="6">
										<el-form-item class="labelName" label="*国籍/Nationality：" >
											<el-select v-model="form.nationality" placeholder="请选择" class="formSelect">
												<el-option
												  v-for="item in nationality"
												  :key="item.value"
												  :label="item.label"
												  :value="item.value">
												</el-option>
											 </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="职业/Occupation："  class="labelName">
											<el-select v-model="form.occupation" placeholder="请选择" class="formSelect">
												<el-option
												  v-for="item in occupation"
												  :key="item.value"
												  :label="item.label"
												  :value="item.value">
												</el-option>
											 </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="邮箱地址/Email Address：："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入密码" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="手机/Phone："  class="labelName">
										 <el-select v-model="form.areacode" placeholder="请选择区号" class="formSelect">
											<el-option
											  v-for="item in areacode"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6" >
										<div class="formSpan">-</div>
										<el-form-item label=""  class="labelName labelNameDown">
											<el-input v-model="form.password" placeholder="请输入您的手机号码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="备用手机/Spare Phone："  class="labelName">
										 <el-select v-model="form.areacodespare" placeholder="请选择区号" class="formSelect">
											<el-option
											  v-for="item in areacode"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<div class="formSpan">-</div>
										<el-form-item label=""  class="labelName labelNameDown"> 
											<el-input v-model="form.number" placeholder="请输入证件号码" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="*居住国家/Residence Country："  class="labelName">
										 <el-select v-model="form.nationality" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in nationality"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="省/State："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="市/Suburb："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="区县/Area："  class="labelName"> 
											<el-input v-model="form.number" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="12">
										<el-form-item label="居住地址/Residence Address："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入您的常住地址，详细至街道，门牌号" class="formAddr"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6" :push="6">
										<el-form-item label="邮编/Postcode："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入邮编" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
							<div class="bodyForm bodyFormNext">
								<div class="headForm">
									<span class="spanMsg">客户证件 | Customer identification（1）</span>
								</div>
								<el-row  :gutter="24"></el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="护照/Passport："  class="labelName">
										 <el-select v-model="form.nationality" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in nationality"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="护照发证机构/Passport Issuer："  class="labelName">
											<el-select v-model="form.issuer" placeholder="请选择" class="formSelect">
												<el-option
												  v-for="item in issuer"
												  :key="item.value"
												  :label="item.label"
												  :value="item.value">
												</el-option>
											 </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="护照号码/Passport Number："  class="labelName">
										  <el-input v-model="form.password" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="护照有效期/Date of expiration："  class="labelName"> 
											<el-date-picker
											      v-model="form.expirationDate"
											      type="date"
											      placeholder="选择日期">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="6">
										<el-form-item label="*护照照片/Passport Photo："  class="labelName">
											<el-upload 
											  class="avatar-uploader "
											  action="/api/common/upload"
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
											  v-for="item in idtype"
											  :key="item.value"
											  :label="item.label"
											  :value="item.value">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="发证机构/Issuer："  class="labelName">
											<el-select v-model="form.issuer" placeholder="请选择" class="formSelect">
												<el-option
												  v-for="item in issuer"
												  :key="item.value"
												  :label="item.label"
												  :value="item.value">
												</el-option>
											 </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件号码/ID Number："  class="labelName">
											<el-input v-model="form.number" placeholder="请输入" ></el-input>
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
				number:'',
				radio: '1',
				expirationDate:'',
				imageUrl:'',
				idcord: '',
				nationality:'',
				areacode:'',
				areacodespare:'',
				issuer:'',
				account:'',
				source:'',
				purpose:'',
			},
			options: [
				],
			imageUrl:require('../../static/image/u95.png'),
			idtype: [],
			nationality:[],
			occupation:[],
			areacode:[],
			issuer:[],
			account:[],
			source:[],
			purpose:[],
			lineWidth: 6,
			lineColor: "#000000",
			bgColor: "",
			resultImg: "",
			isCrop: false,
			fit:'',
			checked:''
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
			this.form.imageUrl = URL.createObjectURL(file.raw);
			console.log(JSON.stringify(res))
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
	},
	mounted() {
		let that = this;
		this.$api.getConfig({type:'idtype'}).then((response)=>{
			that.idtype = response
		})
		this.$api.getConfig({type:'account'}).then((response)=>{
			that.account = response
		})
		this.$api.getConfig({type:'areacode'}).then((response)=>{
			that.areacode = response
		})
		this.$api.getConfig({type:'issuer'}).then((response)=>{
			that.issuer= response
		})
		this.$api.getConfig({type:'nationality'}).then((response)=>{
			that.nationality = response
		})
		this.$api.getConfig({type:'occupation'}).then((response)=>{
			that.occupation = response
		})
		this.$api.getConfig({type:'purpose'}).then((response)=>{
			that.purpose = response
		})
		this.$api.getConfig({type:'source'}).then((response)=>{
			that.source = response
		})
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
	.loginButtonTop{
		margin-right: -93rem;
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
	.labelNameDown{
		margin-top:2.5rem;
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
