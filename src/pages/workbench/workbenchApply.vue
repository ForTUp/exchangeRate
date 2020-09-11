<template>
		<div id="workbenchApply">
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
										<el-radio v-model="isradio" label="1" value='1'>本人 </el-radio><span>默认汇款人</span>
									</el-col>
								</el-row >
								<el-row  class="formRadioHead">
									<el-col>
										<el-radio v-model="isradio" label="2" value='2'>添加汇款人</el-radio>
									</el-col>
								</el-row>
							</div>
							<!-- 添加汇款人-->
							<div v-if="isradio==2">
								<el-row  :gutter="24"></el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="汇款人姓名/Name of Sender："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="请选择区号："  class="labelName">
										 <el-select v-model="form.areacode2_id" placeholder="请选择区号" class="formSelect">
											<el-option
											  v-for="item in areacode"
											 :key="item.id"
											 :label="item.name"
											 :value="item.id">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<div class="formSpan">-</div>
										<el-form-item label="手机号码/Phone Number："  class="labelName labelNameDown"> 
											<el-input v-model="form.mobile2" placeholder="请输入手机号码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="和本人关系/Relationship："  class="labelName">
											<el-input v-model="form.password" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="*居住国家/Residence Country："  class="labelName">
										 <el-select v-model="form.country_id" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in nationality"
											 :key="item.id"
											 :label="item.name"
											 :value="item.id">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="省/State："  class="labelName">
											<el-input v-model="form.province" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="市/Suburb："  class="labelName">
											<el-input v-model="form.city" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="区县/Area："  class="labelName"> 
											<el-input v-model="form.area" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="12">
										<el-form-item label="居住地址/Residence Address："  class="labelName">
											<el-input v-model="form.address" placeholder="请输入您的常住地址，详细至街道，门牌号" class="formAddr"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6" :push="6">
										<el-form-item label="邮编/Postcode："  class="labelName">
											<el-input v-model="form.postcode" placeholder="请输入邮编" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
										 <el-select v-model="form.certificate.idcard.type_id" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in idtype"
											  :key="item.id"
											  :label="item.name"
											  :value="item.id">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件号码/ID Number："  class="labelName">
											<el-input v-model="form.certificate.idcard.number" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件有效期/Date of expiration："  class="labelName"> 
											<el-date-picker
											      v-model="form.certificate.idcard.expiration"
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
											  :on-success="handleAvatarSuccess4"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="fourImage" :src="fourImage" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
											</el-upload>
										</el-form-item>
									</el-col>
									<el-col :span="6" class="imgUpload">
										<el-form-item label=""  class="labelName">
											<el-upload 
											  class="avatar-uploader "
											  action="/api/common/upload"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess5"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="fiveImage" :src="fiveImage" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
											</el-upload>
											</el-form-item>
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
										 <el-select v-model="form.idcard" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in idtype"
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
	name:"workbenchApply",
	data() {
		return {
			form: {
				firstname:'张',
				lastname:'三',
				gender:'1',
				birthday:'1991-03-13', 
				nationality_id: '', 
				occupation_id: '',
				email: 'enoch0418@163.com', 
				areacode_id:'',
				mobile:'13888888888',
				areacode2_id:'',
				mobile2:'13988888888',
				country_id:'',
				province:'省',
				city:'市',
				area:'区',
				address:'居住地址',
				postcode:'邮编',
				sign_url:'',
				certificate:{
					passport:{
						type:'',
						issuer_id:'',
						number:'护照号码',
						expiration:'',
						photos:'',
					},
					idcard:{
						type_id:'',
						issuer_id:'',
						number:'证件号码',
						expiration:'',
						photos:'',
					},
				},
				
			},
			isradio:'1',
			imageUrl:require('../../static/image/u95.png'),
			checkList:[],
			fit:'',
			idtype: [],
			nationality:[],
			occupation:[],
			areacode:[],
			issuer:[],
			account:[],
			source:[],
			purpose:[],
			//图片blob
			firstImage:'',
			secondImage:'',
			thirdImage:'',
			fourImage:'',
			fiveImage:'',
			firstUrl:'',
			secondUrl:'',
			thirdUrl:'',
			fourUrl:'',
			fiveUrl:'',
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
		
		handleAvatarSuccess4(res, file) {
			this.fourImage = URL.createObjectURL(file.raw);
			this.fourUrl = res.data.url;
		},
		handleAvatarSuccess5(res, file) {
			this.fiveImage = URL.createObjectURL(file.raw);
			this.fiveUrl = res.data.url;
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
			console.log(JSON.stringify(response))
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
	@import "../../static/css/form-item.css";  //引入方式
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
