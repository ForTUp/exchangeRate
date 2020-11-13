<template>
		<div id="vipApply">
			<el-container>
				<el-header>
					<div class="headDiv">
					<el-row  style="margin-left: 2rem;">
						<el-col :span="20" >
							<div class="grid-content bg-purple ">
								<div class="logoDiv">
									<div @click="goToIndex" style="cursor: pointer;">
									<el-image class="topImage"
									      :src="imageUrl"
									      :fit="fit"></el-image>
									</div>
									<el-link :underline="false" class="topLink" >会员申请</el-link>
								</div>
							</div>
						</el-col>
						  <el-col :span="4" style="margin-top: 0.5rem;">
						<div class="grid-content bg-purple" >
							<el-button  class="loginButton loginButtonTop" @click="loadLogin">登录</el-button>
						</div>
					  </el-col>
					</el-row>
					</div>
				</el-header>
				<el-main>
					<div class="formDiv">
						<el-form :rules="rules" ref="form" :model="form" label-width="19rem">
							<div class="bodyForm">
								<div class="headForm">
									<span class="spanMsg">客户资料 | Customer detail</span>
								</div>
								<el-row></el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item class="labelName" label="名/First Name：" prop="firstname">
											<el-input v-model="form.firstname" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="姓/Last Name："  class="labelName" prop="lastname">
											<el-input v-model="form.lastname" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="性别/Gender："  class="labelName" prop="gender">
											<div class="formRadio">
											<el-radio v-model="form.gender" label="1">男</el-radio>
											<el-radio v-model="form.gender" label="2">女</el-radio>
											</div>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="出生年月/Date of birth："  class="labelName" prop="birthday"> 
											<el-date-picker
												  v-model="form.birthday"
												  type="date"
												  placeholder="选择日期">
											</el-date-picker>
										</el-form-item>
									</el-col>
									
								</el-row>
								<el-row :gutter="24">
									<el-col :span="6">
										<el-form-item class="labelName" label="国籍/Nationality："  prop="nationality_id">
											<el-select v-model="form.nationality_id" placeholder="请选择" class="formSelect">
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
										<el-form-item label="职业/Occupation："  class="labelName" prop="occupation_id">
											<el-select v-model="form.occupation_id" placeholder="请选择" class="formSelect">
												<el-option
												  v-for="item in occupation"
												 :key="item.id"
												 :label="item.name"
												 :value="item.id">
												</el-option>
											 </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="邮箱地址/Email Address："  class="labelName" prop="email">
											<el-input v-model="form.email" placeholder="请输入邮箱地址" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="手机/Phone："  class="labelName" prop="areacode_id">
										 <el-select v-model="form.areacode_id" placeholder="请选择区号" class="formSelect">
											<el-option
											  v-for="item in areacode"
											 :key="item.id"
											 :label="item.name"
											 :value="item.id">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6" >
										<div class="formSpan">-</div>
										<el-form-item label=""  class="labelName labelNameDown" prop="mobile">
											<el-input v-model="form.mobile" placeholder="请输入您的手机号码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="备用手机/Spare Phone："  class="labelName" prop="areacode2_id">
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
										<el-form-item label=""  class="labelName labelNameDown" prop="mobile2"> 
											<el-input v-model="form.mobile2" placeholder="请输入您的手机号码" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="居住国家/Residence Country："  class="labelName" prop="country_id">
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
										<el-form-item label="省/State："  class="labelName" prop="province">
											<el-input v-model="form.province" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="市/Suburb："  class="labelName" prop="city">
											<el-input v-model="form.city" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<!-- <el-col :span="6">
										<el-form-item label="区县/Area："  class="labelName" prop="area"> 
											<el-input v-model="form.area" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col> -->
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="12">
										<el-form-item label="居住地址/Residence Address："  class="labelName" prop="address">
											<el-input v-model="form.address" placeholder="请输入您的常住地址，详细至街道，门牌号" class="formAddr"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6" :push="6">
										<el-form-item label="邮编/Postcode："  class="labelName" prop="postcode">
											<el-input v-model="form.postcode" placeholder="请输入邮编" ></el-input>
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
										<el-form-item label="证件类型/ID Type："  class="labelName" prop="certificate.passport.type">
										 <el-select v-model="form.certificate.passport.type_id" placeholder="请选择" class="formSelect">
											 <!-- <el-option value="passport">Passport</el-option> -->
											<el-option
											  v-for="item in passport"
											 :key="item.id"
											 :label="item.name"
											 :value="item.id">
											</el-option> 
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="发证机构/Issuer："  class="labelName" prop="certificate.passport.issuer_id">
											<el-select v-model="form.certificate.passport.issuer_id" placeholder="请选择" class="formSelect">
												<el-option
												  v-for="item in issuer"
												  :key="item.id"
												  :label="item.name"
												  :value="item.id">
												</el-option>
											 </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件号码/ID Number："  class="labelName" prop="certificate.passport.number">
										  <el-input v-model="form.certificate.passport.number" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件有效期/Date of expiration："  class="labelName" prop="certificate.passport.expiration"> 
											<el-date-picker
											      v-model="form.certificate.passport.expiration"
											      type="date"
											      placeholder="选择日期">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="6">
										<el-form-item label="证件照片/Passport Photo："  class="labelName" prop="firstUrl">
											<el-upload 
											  class="avatar-uploader "
											  action="/api/common/upload"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess" 
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="firstImage" :src="firstImage" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">请上传清晰彩色的扫描件或者照片，支持JPG、PNG、JPEG的图片格式。</div>
											</el-upload>
										</el-form-item>
									</el-col>
									<el-col :span="6" class="imgUpload">
										<el-form-item label=""  class="labelName" prop="secondUrl">
											<el-upload 
											  class="avatar-uploader "
											  action="/api/common/upload"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess2"
											  :before-upload="beforeAvatarUpload">
											  <img v-if="secondImage" :src="secondImage" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">请上传清晰彩色的扫描件或者照片，支持JPG、PNG、JPEG的图片格式。</div>
											</el-upload>
											</el-form-item>
									</el-col>
									<el-col :span="6" class="imgUpload">
										<el-form-item label=""  class="labelName" prop="thirdUrl">
											<el-upload 
											  class="avatar-uploader "
											  action="/api/common/upload"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess3"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="thirdImage" :src="thirdImage" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">请上传清晰彩色的扫描件或者照片，支持JPG、PNG、JPEG的图片格式。</div>
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
										<el-form-item label="证件类型/ID Type："  class="labelName" prop="certificate.idcard.type_id">
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
										<el-form-item label="发证机构/Issuer："  class="labelName" prop="certificate.idcard.issuer_id">
											<el-select v-model="form.certificate.idcard.issuer_id" placeholder="请选择" class="formSelect">
												<el-option
												  v-for="item in issuer"
												 :key="item.id"
												 :label="item.name"
												 :value="item.id">
												</el-option>
											 </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件号码/ID Number："  class="labelName" prop="certificate.idcard.number">
											<el-input v-model="form.certificate.idcard.number" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件有效期/Date of expiration："  class="labelName" prop="certificate.idcard.expiration"> 
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
										<el-form-item label="证件照片/Passport Photo："  class="labelName" prop="fourUrl">
											<el-upload 
											  class="avatar-uploader "
											  action="/api/common/upload"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess4"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="fourImage" :src="fourImage" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">请上传清晰彩色的扫描件或者照片，支持JPG、PNG、JPEG的图片格式。</div>
											</el-upload>
										</el-form-item>
									</el-col>
									<el-col :span="6" class="imgUpload">
										<el-form-item label=""  class="labelName" prop="fiveUrl">
											<el-upload 
											  class="avatar-uploader "
											  action="/api/common/upload"
											  :show-file-list="false"
											  :on-success="handleAvatarSuccess5"
											  :before-upload="beforeAvatarUpload">
											  
											  <img v-if="fiveImage" :src="fiveImage" class="avatar">
											  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
											  <div class="el-upload__text">请上传清晰彩色的扫描件或者照片，支持JPG、PNG、JPEG的图片格式。</div>
											</el-upload>
											</el-form-item>
									</el-col>
									
									
								</el-row>
							</div>
							
							<div class="bodyForm bodyFormNext esignFormDiv">
								<div class="headForm">
									<span class="spanMsg">客户签名 | Customer sign</span>
								</div>
								<!-- 
								<vue-esign ref="esign"
									   :isCrop="isCrop"
									   :lineWidth="lineWidth"
									   :lineColor="lineColor"
									   :bgColor.sync="bgColor" 
									   class="vueEsign"/>
								<el-row  :gutter="24" class="esignBtn">
									<el-col :span="6" :pull="12">
										<div class="btn">
											<el-button  class="vipButton buttonEsign" @click="handleReset">重置</el-button>
											<el-button  class="loginButton vipButton buttonEsign" @click="handleGenerate">确定</el-button>
										</div>
									</el-col>
								</el-row>	 -->
								<div class="signature"  id="signature"></div><!-- 画布容器 -->
								<div class="sign-swrap">

									<el-button id="clearSignature" @click='clearSignature'>清除签名</el-button>
									<el-button id="saveSignature" @click='saveSignature'>保存签名</el-button>
								</div>
								<!-- <div id="result"></div><!-- 预览容器 --> 
								<!-- <el-row :gutter="24"  class="esignBtn"></el-row> -->
							</div>
							<div class="checkDiv">
								<el-checkbox v-model="checked">我已阅读并同意<span class="checkBtn">《隐私保护政策条款》</span>，并确认上述信息和提供的文件真实无误。</el-checkbox>
							</div>
							<div class="formSubmitBtn">
								<el-button  class="submitBtn" @click="submitForm('form')" >提交</el-button>
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
				firstname:'',
				lastname:'',
				gender:'1',
				birthday:'', 
				nationality_id: '', 
				occupation_id: '',
				email: '', 
				areacode_id:'',
				mobile:'',
				areacode2_id:'',
				mobile2:'',
				country_id:'',
				province:'',
				city:'',
				area:'',
				address:'',
				postcode:'',
				sign_url:'',
				certificate:{
					passport:{
						type_id:'',
						issuer_id:'',
						number:'',
						expiration:'',
						photos:'',
					},
					idcard:{
						type_id:'',
						issuer_id:'',
						number:'',
						expiration:'',
						photos:'',
					},
				},
			},
			rules: {
				firstname:[
					{required: true, message: '请输入名', trigger: 'change' }
				],
				lastname:[
					{required: true, message: '请输入姓', trigger: 'change' }
				],
				birthday:[
					{required: true, message: '请输入出生年月', trigger: 'change'}
				], 
				nationality_id: [
					{required: true, message: '请选择国籍', trigger: 'change'}
				], 
				occupation_id:[
					{required: true, message: '请选择职业', trigger: 'change'}
				], 
				// email: [
				// 	{required: true, message: '请输入邮箱地址', trigger: 'change'}
				// ], 
				areacode_id:[
					{required: true, message: '请输入手机', trigger: 'change'}
				],
				mobile:[
					{required: true, message: '请输入手机', trigger: 'change'}
				],
				// areacode2_id:[
				// 	{required: true, message: '请输入备用手机', trigger: 'change'}
				// ],
				// mobile2:[
				// 	{required: true, message: '请输入备用手机', trigger: 'change'}
				// ],
				country_id:[
					{required: true, message: '请输入居住国家', trigger: 'change'}
				],
				province:[
					{required: true, message: '请输入省', trigger: 'change'}
				],
				city:[
					{required: true, message: '请输入市', trigger: 'change'}
				],
				// area:[
				// 	{required: true, message: '请输入区县', trigger: 'change'}
				// ],
				address:[
					{required: true, message: '请输入居住地址', trigger: 'change'}
				],
				sign_url:[
					{required: true, message: '请输入客户签名', trigger: 'change'}
				],
				certificate:{
					passport:{
						type:[
							{required: true, message: '请选择证件类型', trigger: 'change'}
						],
						issuer_id:[
							{required: true, message: '请选择发证机构', trigger: 'change'}
						],
						number:[
							{required: true, message: '请输入证件号码', trigger: 'change'}
						],
						expiration:[
							{required: true, message: '请选择证件有效期', trigger: 'change'}
						],
						photos:[
							{required: true, message: '请上传证件照片', trigger: 'change'}
						],
					},
					idcard:{
						type_id:[
							{required: true, message: '请选择证件类型', trigger: 'change'}
						],
						issuer_id:[
							{required: true, message: '请选择发证机构', trigger: 'change'}
						],
						number:[
							{required: true, message: '请输入证件号码', trigger: 'change'}
						],
						expiration:[
							{required: true, message: '请选择证件有效期', trigger: 'change'}
						],
						photos:[
							{required: true, message: '请上传证件照片', trigger: 'change'}
						],
					},
				},
			},
			options: [
				],
			imageUrl:require('../../static/image/u95.png'),
			idtype: [],
			nationality:[],
			passport:[],
			occupation:[],
			areacode:[],
			issuer:[],
			account:[],
			source:[],
			purpose:[],
			lineWidth: 4,
			lineColor: "#000000",
			bgColor: "",
			resultImg: "",
			isCrop: false,
			fit:'',
			checked:'',
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
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if(this.firstUrl=='' || this.secondUrl=='' || this.thirdUrl=='' ||this.fourUrl=='' ||this.fiveUrl==''){
						this.$message({
							message: '请上传图片！',
							type: 'warning'
						})
						return;
					}
					if(this.checked==null || this.checked==''){
						this.$message({
							message: '请勾选隐私保护政策条款！',
							type: 'warning'
						})
						return;
					}
					this.form.certificate.passport.photos = this.firstUrl + "," + this.secondUrl + "," + this.thirdUrl;
					this.form.certificate.idcard.photos = this.fourUrl + "," + this.fiveUrl;
					let params = this.qs.stringify(this.form);
					let packJson  = {"data":JSON.stringify(this.form)};
					this.$api.apply(this.qs.stringify(packJson)).then((response)=>{
						console.log(response)
						let {data,code} = response;
						if(code=='1'){
							this.$message({
								message: response.msg,
								type: 'warning'
							})
							this.loadLogin();
						}else{
							this.$message({
								message: response.msg,
								type: 'warning'
							})
						}
					})
				} else {
					return false;
				}
			});
		},
		loadLogin(){
			this.$router.push('/login');
		},
		handleAvatarSuccess(res, file) {
			this.firstImage = URL.createObjectURL(file.raw);
			console.log(JSON.stringify(res))
			this.firstUrl = res.data.url;
			// this.form.certificate.passport.photos = this.form.certificate.idcard.photos + ','+res.data.url;
			
		},
		handleAvatarSuccess2(res, file) {
			this.secondImage = URL.createObjectURL(file.raw);
			this.secondUrl = res.data.url;
		},
		handleAvatarSuccess3(res, file) {
			this.thirdImage = URL.createObjectURL(file.raw);
			this.thirdUrl = res.data.url;
		},
		handleAvatarSuccess4(res, file) {
			this.fourImage = URL.createObjectURL(file.raw);
			this.fourUrl = res.data.url;
		},
		handleAvatarSuccess5(res, file) {
			this.fiveImage = URL.createObjectURL(file.raw);
			this.fiveUrl = res.data.url;
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
			  this.$api.upload(formData).then((response)=>{
				  console.log(response)
				  if(response.code==1){
					  this.form.sign_url=response.data.url;
				  }else{
					  this.$message({
						 message: response.msg,
						 type: 'warning'
					  })
				  }
			  })
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
		goToIndex(){
			this.$router.push('/index');
		},
		clearSignature(){
		  //$('#result').html('')//清除预览img
		  this.form.sign_url = '';
		  $('#signature').jqSignature('clearCanvas')//清除canvas
		},
		saveSignature(){
			  let signatureBox = $('#signature');
			  let canvas = signatureBox.children('canvas').eq(0)[0]
			  let data = signatureBox.jqSignature('getDataURL');//base64数据
			  //创建一个空的canvas,判断是否画布为空
			  var blankCanvas = document.createElement('canvas');
			  blankCanvas.width = canvas.width;
			  blankCanvas.height = canvas.height;
			  if(blankCanvas.toDataURL() == canvas.toDataURL()){
				this.$message({
					 message: '请签名',
					 type: 'warning'
				})
			    return;
			  }
			  //为了解决在ios设备上修改img标签src地址无效的问题,所以每次保存重新创建一个预览img标签,在清除签名时,在移除img标签
			  // let img = new Image();
			  // img.src = data;
			  this.saveImageBase64(data)
		},
		saveImageBase64(base64){
			let _this = this;
			var blob = _this.dataURLtoBlob(base64);
			var tofile = _this.blobToFile(blob, '签名.jpg');
			setTimeout(async () => {
			  const formData = new FormData()
			  formData.append('file', tofile, tofile.name)
			  formData.append('fileType', 9)
			  this.$api.upload(formData).then((response)=>{
				  console.log(response)
				  if(response.code==1){
					  this.form.sign_url=response.data.url;
					  this.$message({
					  	 message: '已上传签名',
					  	 type: 'success'
					  })
				  }else{
					  this.$message({
						 message: response.msg,
						 type: 'warning'
					  })
				  }
			  })
			})
		}
		
	},
	mounted() {
		let that = this;
		$('#signature').jqSignature({
		  width:'300',//canvas 宽度,默认值300
		  height:'250',//canvas 高度,默认值100
		  border:'1px solid #cccccc',//canvas 边框,默认值'1px solid red'
		  background:'#ddd',//canvas 背景,默认值'#ffffff'
		  lineColor:"#0A4D82",//签名线条颜色,默认值'#222222'
		  lineWidth:3,//签名线条宽度,默认值1
		  autoFit:true//使canvas的宽度充满父元素,默认值 false
		})
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
		this.$api.getConfig({type:'passport'}).then((response)=>{
			that.passport = response
		})
	}
}	
</script>

<style scoped lang="scss">
	@import "../../static/css/form-item.css";  //引入方式
	body > .el-container {
	}
	.el-header, .el-footer {
	}
	.el-main {
	}
	
	.headDiv{
		width: 84rem;;
		margin: 0 auto;
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
	.buttonEsign{
		margin-left: 2rem;
	}
	
	.signature{
		width:100%;
		height:18.75rem;
	}
	.sign-swrap {
		padding-top:4.5rem;
	}
</style>
