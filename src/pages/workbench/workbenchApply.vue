<template>
		<div id="workbenchApply">
			<el-container>
				<el-header>
					<div class="headDiv">
						<el-row >
							<el-col :span="20">
								<div class="grid-content bg-purple ">
									<div class="logoDiv">
										<div @click="goToIndex" style="cursor: pointer;">
										<el-image class="topImage"
											  :src="imageUrl"
											  :fit="fit"></el-image>
										</div>
										<el-link :underline="false" class="topLink">工作台</el-link>
									</div>
								</div>
							</el-col>
							  <el-col :span="4">
							<div class="grid-content bg-purple">
								<span class="loginSpan">{{userInfo.username}}</span>
								<el-button  class="exitBtn" @click="loginout">退出</el-button>
							</div>
						  </el-col>
						</el-row>
					</div>
				</el-header>
				<el-main>
					<div class="formDiv">
						<el-form ref="form" :model="form" :rules="rules" label-width="19rem">
							<div class="returnDiv">
								<el-button class="returnBtn" @click="$router.back(-1)">返回</el-button>
							</div>

							<div class="bodyForm">
								<div class="headForm">
									<span class="spanMsg">汇款人 | Sender detail</span>
								</div>
								<el-row class="formRadioHead">
									<el-col>
										<el-radio v-model="form.remit_type" :label="0" >本人 </el-radio><span  v-if="isDefault" class="textSpan">默认汇款人</span>
									</el-col>
								</el-row >
								<el-row class="formRadioHead" v-if="remitList">
									<el-col>
										<el-radio v-model="form.remit_type" :label="1" >历史汇款人</el-radio>
									</el-col>
								</el-row >
								<el-row class="formRadioHead"  v-if="form.remit_type=='1'" >
									<el-col>
										  <el-radio-group v-model="form.remit_id" size="mini" >
											  <el-radio
											  v-for="item in remitList"
											  :label="item.id"
											  :name="item.realname"
											  style="display:block; margin:1rem"
											  >
											   <!-- style="display:block; margin:1rem" -->
											  {{item.realname }} ( {{item.mobile}} ) 
											  <span @click="setDefault(item.id)" class="setTextSpan" v-if="form.remit_id==item.id && item.default=='0'">设为默认汇款人</span>
											  <span class="textSpan" v-if="item.default=='1'">默认汇款人</span>
											  </el-radio>
										  </el-radio-group>
									</el-col>
								</el-row >
								<el-row  class="formRadioHead" style="padding-bottom: 2rem;">
									<el-col>
										<el-radio v-model="form.remit_type" :label="2" >添加汇款人</el-radio>
									</el-col>
								</el-row>
							</div>
							<!-- 添加汇款人-->
							<div v-if="form.remit_type==2" class="bodyForm">
								<el-row  :gutter="24"></el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="汇款人姓名/Name of Sender："  class="labelName">
											<el-input v-model="form.remit_info.realname" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="请选择区号："  class="labelName">
										 <el-select v-model="form.remit_info.areacode_id" placeholder="请选择区号" class="formSelect">
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
											<el-input v-model="form.remit_info.mobile" placeholder="请输入手机号码" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="和本人关系/Relationship："  class="labelName">
											<el-input v-model="form.remit_info.relationship" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="居住国家/Residence Country："  class="labelName">
										 <el-select v-model="form.remit_info.country_id" placeholder="请选择" class="formSelect">
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
											<el-input v-model="form.remit_info.province" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="市/Suburb："  class="labelName">
											<el-input v-model="form.remit_info.city" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="12">
										<el-form-item label="居住地址/Residence Address："  class="labelName">
											<el-input v-model="form.remit_info.address" placeholder="请输入您的常住地址，详细至街道，门牌号" class="formAddr"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6" :push="6">
										<el-form-item label="邮编/Postcode："  class="labelName">
											<el-input v-model="form.remit_info.postcode" placeholder="请输入邮编" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="24">
									<el-col :span="6">
										<el-form-item label="证件类型/ID Type："  class="labelName">
										 <el-select v-model="form.remit_info.certificate.passport.type_id" placeholder="请选择" class="formSelect">
											<el-option
											  v-for="item in type_ids"
											  :key="item.id"
											  :label="item.name"
											  :value="item.id">
											</el-option>
										  </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件号码/ID Number："  class="labelName">
											<el-input v-model="form.remit_info.certificate.passport.number" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="证件有效期/Date of expiration："  class="labelName"> 
											<el-date-picker
											      v-model="form.remit_info.certificate.passport.expiration"
											      type="date"
											      placeholder="选择日期">
											</el-date-picker>
										</el-form-item>
									</el-col>
									
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="6">
										<el-form-item label="护照照片/Passport Photo："  class="labelName">
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
										<el-form-item label="汇款店铺/Company："  class="labelName" prop="company_id">
											<el-select v-model="form.company_id" placeholder="请选择" class="formSelect" clearable filterable >
												<el-option
												  v-for="item in companyList"
												 :key="item.id"
												 :label="item.name"
												 :value="item.id">
												</el-option>
											 </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="汇款类型/Type："  class="labelName" prop="type">
											<div class="formRadio">
												<el-radio v-model="form.type" :label="1" >买入货币</el-radio>
												<el-radio v-model="form.type" :label="2" >卖出货币</el-radio>
											</div>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="汇款币种/Currency："  class="labelName" prop="currency">
											<el-select v-model="form.currency" placeholder="请选择" class="formSelect" clearable filterable >
												<el-option
												  v-for="item in currencyList"
												 :key="item.code"
												 :label="item.name+item.code"
												 :value="item.code">
												</el-option>
											 </el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="汇款金额/Amount："  class="labelName" prop="money">
										 <el-input type="number" step="0.01" v-model="form.money" placeholder="请输入" ></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="6">
										<el-form-item label="资金来源/source of fund："  class="labelName" prop="source">
											<el-checkbox-group 
											    v-model="form.source"
												class="checkForm">
											    <el-checkbox class="checkboxSpanNext" v-for="item in sourceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
											  </el-checkbox-group>
										</el-form-item>
									</el-col>
									
								</el-row>
								<el-row  :gutter="18">
									<el-col :span="6">
										<el-form-item label="资金用途/Purpose of the transfer："  class="labelName" prop="purpose">
											<el-checkbox-group
											    v-model="form.purpose"
												class="checkForm">
											    <el-checkbox class="checkboxSpanNext" v-for="item in  purposeList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
											  </el-checkbox-group>
										</el-form-item>
									</el-col>
									
								</el-row>
								
							</div>
							
							<div class="bodyForm bodyFormNext">
								<div class="headForm">
									<span class="spanMsg">接收人 | Payee detail</span>
								</div>
								<div v-if="beneficiaryList">
									<el-row style="width: 100%;height: 3rem; line-height: 3rem;margin-top: 2rem;text-align: left; padding-left: 1rem; ">
										<span>历史汇款人</span><span style="color: orange;">（最多可以勾选2位收款人，总收款人人数不超过2人）</span>
									</el-row >
									<el-row class="formRadioHead" style="height: auto;padding-bottom: 2rem;">
										<el-col>
											  <el-checkbox-group
											      v-model="beneficiary_ids"
											  	class="checkForm">
											      <el-checkbox style="display:block;padding-bottom: 0.8rem;" class="checkboxSpanNext" v-for="item in beneficiaryList" :label="item.id" :key="item.id">{{item.realname}}</el-checkbox>
											    </el-checkbox-group>
										</el-col>
									</el-row >
								</div>
								<!-- <div class="bodyForm">
									<el-row class="formRadioHead"  v-if="beneficiaryList" >
										<el-col>
											  <el-radio-group v-model="form.remit_id" border='false' size="mini" >
												  <el-radio label="1" border
												  v-for="item in beneficiaryList"
												  :label="item.id"
												  :name="item.realname"
												  >
												  {{item.realname}}
												  </el-radio>
											  </el-radio-group>
										</el-col>
									</el-row >
								</div> -->
								<div class="headForm">
									<el-link type="primary" :underline="false" @click="showPayee" style="margin-left: 1rem;">添加接收人</el-link>
								</div>
								
								
								
								<div class="Payee" v-if="isshow1">
									<el-row :gutter="12">
										<el-col :span="6">
											<div class="PayeeDiv">
												<span>1号接收人基本信息</span>
											</div>
										</el-col>
										<el-col :span="6" style="margin-top: 0.7rem !important; margin-left: -7rem;">
											<el-button type="danger" icon="el-icon-delete" circle @click="closeShow(1)"></el-button>
										</el-col>
									</el-row>
									<el-row  :gutter="24">
										<el-col :span="6">
											<el-form-item label="汇款人姓名/Name of Sender："  class="labelName">
												<el-input v-model="beneficiary_list[0].realname" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="请选择区号："  class="labelName">
											 <el-select v-model="beneficiary_list[0].areacode_id" placeholder="请选择区号" class="formSelect">
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
												<el-input v-model="beneficiary_list[0].mobile" placeholder="请输入手机号码" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="和本人关系/Relationship："  class="labelName">
												<el-input v-model="beneficiary_list[0].relationship" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row  :gutter="24">
										<el-col :span="6">
											<el-form-item label="居住国家/Residence Country："  class="labelName">
											 <el-select v-model="beneficiary_list[0].country_id" placeholder="请选择" class="formSelect">
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
												<el-input v-model="beneficiary_list[0].province" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="市/Suburb："  class="labelName">
												<el-input v-model="beneficiary_list[0].city" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row  :gutter="18">
										<el-col :span="12">
											<el-form-item label="居住地址/Residence Address："  class="labelName">
												<el-input v-model="beneficiary_list[0].address" placeholder="请输入您的常住地址，详细至街道，门牌号" class="formAddr"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6" :push="6">
											<el-form-item label="邮编/Postcode："  class="labelName">
												<el-input v-model="beneficiary_list[0].postcode" placeholder="请输入邮编" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="24">
										<div class="PayeeDiv">
											<span>1号接收人银行信息</span>
										</div>
									</el-row>
									<el-row :gutter="24">
										<el-col :span="6">
											<el-form-item label="银行名称/Bank Name："  class="labelName">
											 <el-input v-model="beneficiary_list[0].bankname" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="开户银行分支行/BSB："  class="labelName">
												<el-input v-model="beneficiary_list[0].bank" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="银行账号/ Account Number："  class="labelName">
												<el-input v-model="beneficiary_list[0].account" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="Swift Code："  class="labelName"> 
												<el-input v-model="beneficiary_list[0].swift_code" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="24">
										<el-col :span="6">
											<el-form-item label="备注/Remarks："  class="labelName"> 
												<el-input v-model="beneficiary_list[0].remark" placeholder="请输入" class="formRemark" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
								<div class="Payee" v-if="isshow2">
									<el-row :gutter="24">
										<el-col :span="6">
											<div class="PayeeDiv" style="background-color: blueviolet;">
												<span>2号接收人基本信息</span>
											</div>
										</el-col>
										<el-col :span="6" style="margin-top: 0.7rem !important; margin-left: -7rem;">
											<el-button type="danger" icon="el-icon-delete" circle @click="closeShow(2)"></el-button>
										</el-col>
									</el-row>
									<el-row  :gutter="24">
										<el-col :span="6">
											<el-form-item label="汇款人姓名/Name of Sender："  class="labelName">
												<el-input v-model="beneficiary_list[1].realname" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="请选择区号："  class="labelName">
											 <el-select v-model="beneficiary_list[1].areacode_id" placeholder="请选择区号" class="formSelect">
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
												<el-input v-model="beneficiary_list[1].mobile" placeholder="请输入手机号码" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="和本人关系/Relationship："  class="labelName">
												<el-input v-model="beneficiary_list[1].relationship" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row  :gutter="24">
										<el-col :span="6">
											<el-form-item label="居住国家/Residence Country："  class="labelName">
											 <el-select v-model="beneficiary_list[1].country_id" placeholder="请选择" class="formSelect">
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
												<el-input v-model="beneficiary_list[1].province" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="市/Suburb："  class="labelName">
												<el-input v-model="beneficiary_list[1].city" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row  :gutter="18">
										<el-col :span="12">
											<el-form-item label="居住地址/Residence Address："  class="labelName">
												<el-input v-model="beneficiary_list[1].address" placeholder="请输入您的常住地址，详细至街道，门牌号" class="formAddr"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6" :push="6">
											<el-form-item label="邮编/Postcode："  class="labelName">
												<el-input v-model="beneficiary_list[1].postcode" placeholder="请输入邮编" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="24">
										<div class="PayeeDiv" style="background-color: blueviolet;">
											<span>2号接收人银行信息</span>
										</div>
									</el-row>
									<el-row :gutter="24">
										<el-col :span="6">
											<el-form-item label="银行名称/Bank Name："  class="labelName">
											 <el-input v-model="beneficiary_list[1].bankname" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="开户银行分支行/BSB："  class="labelName">
												<el-input v-model="beneficiary_list[1].bank" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="银行账号/ Account Number："  class="labelName">
												<el-input v-model="beneficiary_list[1].account" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											<el-form-item label="Swift Code："  class="labelName"> 
												<el-input v-model="beneficiary_list[1].swift_code" placeholder="请输入" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="24">
										<el-col :span="6">
											<el-form-item label="备注/Remarks："  class="labelName"> 
												<el-input v-model="beneficiary_list[1].out_remark" placeholder="请输入" class="formRemark" ></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</div>
							</div>
							<div class="formSubmitBtn">
								<el-button  class="submitBtn" @click="submitForm('form')">提交</el-button>
							</div>
							
						</el-form>
					</div>
					
				</el-main>
			</el-container>
		</div>
</template>

<script>
import { mapGetters } from 'vuex'
	
export default{
	computed:{...mapGetters(['userId','userInfo'])},
	name:"workbenchApply",
	data() {
		return {
			form:{
				id:0,
				remit_type:0,
				remit_id:0,
				remit_info:{
					realname:"",
					areacode_id:"",
					mobile:"",
					relationship:"",
					country_id:"",
					province:"",
					city:'',
					address:'',
					postcode:'',
					certificate:{
						passport:{
							type_id:'',
							number:'',
							expiration:'',
							photos:''
						}
					}
				},
				company_id:null,
				type:1,
				currency:"",
				money: null,
				source:[],
				purpose:[],
				beneficiary_ids:[],
				beneficiary_list:[]
			},
			rules:{
				company_id:[
					{required: true, message: '请选择汇款店铺', trigger: 'change' }
				],
				type:[
					{required: true, message: '请选择汇款类型', trigger: 'change' }
				],
				currency:[
					{required: true, message: '请选择汇款币种', trigger: 'change' }
				],
				money:[
					{required: true, message: '请输入汇款金额', trigger: 'change' }
				],
				source:[
					{type: 'array', required: true, message: '请至少选择一个资金来源', trigger: 'change' }
				],
				purpose:[
					{type: 'array', required: true, message: '请至少选择一个资金用途', trigger: 'change' }
				],
			},
			imageUrl:require('../../static/image/u95.png'),
			checkList:[],
			fit:'',
			type_ids: [],
			nationality:[],
			occupation:[],
			areacode:[],
			issuer:[],
			account:[],
			source_ids:[],
			purpose_ids:[],
			currencyList:[],
			companyList:[],
			//图片blob
			fourImage:'',
			fiveImage:'',
			fourUrl:'',
			fiveUrl:'',
			sourceList:[],
			purposeList:[],
			//接收人显示影藏
			isshow1:false,
			isshow2:false,
			//汇款人列表
			remitList:[],
			//接收人列表
			beneficiaryList:[],
			beneficiary_ids:[],
			beneficiary_list:[
				{
					realname:"",
					areacode_id:"",
					mobile:"",
					relationship:"",
					country_id:'',
					province:"",
					city:"",
					address:"",
					postcode:"",
					bankname:"",
					bank:"",
					account:"",
					swift_code:"",
					remark:""
				},
				{
					realname:"",
					areacode_id:"",
					mobile:"",
					relationship:"",
					country_id:'',
					province:"",
					city:"",
					address:"",
					postcode:"",
					bankname:"",
					bank:"",
					account:"",
					swift_code:"",
					remark:""
				}
			],
			//默认人是本人的标记
			isDefault:'',
			height:''
		}
		
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if(this.form.remit_type=='2' && (this.fourUrl=='' ||this.fiveUrl=='')){
						this.$message({ 
							message: '请上传图片！',
							type: 'warning'
						})
						return;
					}
					this.form.beneficiary_list=[];
					if(this.beneficiary_list[0].realname){
						this.form.beneficiary_list.push(this.beneficiary_list[0]);
					}
					if(this.beneficiary_list[1].realname){
						this.form.beneficiary_list.push(this.beneficiary_list[1]);
					}
					//资金用途和资金来源
					this.form.source=this.form.source.join(',');
					this.form.purpose=this.form.purpose.join(',');
					//图片
					this.form.remit_info.certificate.passport.photos = this.fourUrl + "," + this.fiveUrl;
					//
					if(this.beneficiary_ids){
						this.form.beneficiary_ids=this.beneficiary_ids.join(',');
					}
					const formData = new FormData();
					formData.append('data',JSON.stringify(this.form));
					formData.append('id',this.form.id);
					console.log(this.form)
					this.$api.remit(formData).then((response)=>{
						console.log(response)
						if(response.code=='1'){
							this.$message({
								message: response.msg,
								type: 'success'
							})
							this.$router.push('/workbench')
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
		beforeAvatarUpload(file) {
			if (file.type != 'image/jpeg' && file.type != 'image/png' && file.type != 'application/pdf') {
				this.$message.error('上传图片只能是JPG、PNG、JPEG的图片格式或PDF格式文件!');
				return false;
			}
			return true;
		},
		handleAvatarSuccess4(res, file) {
			if (file.raw.type.indexOf('image') != -1) {
				this.fourImage = URL.createObjectURL(file.raw);
			} else if (file.raw.type.indexOf('pdf') != -1) {
				this.fourImage = appConfig.apiUrl + '/zIpTSBPkuO.php/ajax/icon?suffix=pdf';
			} else {
				this.fourImage = appConfig.apiUrl + '/zIpTSBPkuO.php/ajax/icon?suffix=file';
			}
			this.fourUrl = res.data.url;
		},
		handleAvatarSuccess5(res, file) {
			if (file.raw.type.indexOf('image') != -1) {
				this.fiveImage = URL.createObjectURL(file.raw);
			} else if (file.raw.type.indexOf('pdf') != -1) {
				this.fiveImage = appConfig.apiUrl + '/zIpTSBPkuO.php/ajax/icon?suffix=pdf';
			} else {
				this.fiveImage = appConfig.apiUrl + '/zIpTSBPkuO.php/ajax/icon?suffix=file';
			}
			this.fiveUrl = res.data.url;
		},
		showPayee(){
			if(!this.isshow1){
				this.isshow1=true;
				return;
			}
			if(!this.isshow2){
				this.isshow2=true;
				return;
			}
		},
		loginout(){
			let that = this;
			this.$confirm('是否退出登录?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				this.$api.logout().then((response) => {
					console.log(response.data)
					const {data} = response;
					console.log(data)
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
				}).catch(function(err){
					console.log(err)
				})
			}).catch(() => {
			});
		},
		setDefault(id){
			let that = this;
			console.log(id)
			const formData = new FormData();
			formData.append('id',id);
			this.$api.remitSetDefault(formData).then((response)=>{
				console.log(response);
				const {data,code}=response;
				if(code=='1'){
					this.$message({
						message: response.msg,
						type: 'success'
					})
					that.getRemitList(null);
					
				}else{
					this.$message({
						message: response.msg,
						type: 'success'
					})
				}
			})
		},
		getRemitList(id){
			let that = this;
			this.$api.getUserRelation({type:1}).then((response)=>{
				this.remitList=response.data;
				console.log(this.remitList)
				if(this.remitList){
					this.remitList.forEach(function(value,i){
						console.log(value,'value')
						if(value.default=='1'){
							that.isDefault='1';
							if(id){
								
							}else{
								that.form.remit_type=1;
								that.form.remit_id=value.id;
							}
							return;
						}
					})
					that.isDefault='';
				}
			})
		},
		goToIndex(){
			this.$router.push('/index')
		},
		closeShow(num){
			if(num==1){
				this.isshow1=false;
			} else {
				this.isshow2=false;
			}
		}
	},
	mounted() {
		if(this.userInfo==null || this.userInfo=={}){
			this.$message({
				message: '请登录！',
				type: 'warning'
			})
			this.$router.push('/login');
			return;
		}
		let that = this;
		this.$api.getConfig({type:'passport'}).then((response)=>{
			that.type_ids = response
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
		this.$api.getConfig({type:'source'}).then((response)=>{
			that.sourceList = response
			// this.form.source = [response[0].id]
		})
		this.$api.getConfig({type:'purpose'}).then((response)=>{
			that.purposeList = response
		})
		//获取店铺列表
		this.$api.getCompanyList({current_page:1,per_page:10000}).then((response) =>{
			console.log(response.data.rows);
			this.companyList = response.data.rows;
		})
		//获取货币列表
		this.$api.getCurrencyList({current_page:1,per_page:10000}).then((response) =>{
			let currencyList = []
			let i = 0;
			response.data.rows.forEach(function(item, index) {
				if (item.code == 'AUD' || item.code == 'CNY') {
					currencyList[i] = item;
					i++;
				}
			})
			console.log(currencyList);
			this.currencyList = currencyList;
		})
		this.getRemitList(this.$route.params.id)
		
		//获取收款人
		this.$api.getUserRelation({type:2}).then((response)=>{
			that.beneficiaryList=response.data;
		})
		//编辑
		if(this.$route.params.id){
			this.form.id=this.$route.params.id;
			this.$api.remitInfo({id:this.form.id}).then((response)=>{
				console.log(response,'remitInfo')
				let {data,code} = response;
				if(code=='1'){
					this.form.company_id=parseInt(data.company_id);
					this.form.type=parseInt(data.type);
					this.form.currency=data.currency;
					this.form.money=data.money;
					this.form.source=data.source;
					this.form.purpose=data.purpose;
					this.form.remit_id=data.remit_id;
					if(data.remit_id=='0'){
						this.form.remit_type=0;
					}else{
						this.form.remit_type=1;
					}
					let that = this;
					this.beneficiary_ids=[];
					data.beneficiary_list.forEach(function(value,i){
						that.beneficiary_ids.push(parseInt(value.id));
					})
					this.form.beneficiary_ids=this.beneficiary_ids.join(',');
					
					let sourceList = data.source.split(',');
					let purposeList = data.purpose.split(',');

					this.source_ids = [];
					console.log(sourceList);
					sourceList.forEach(function(value,i){
						that.source_ids.push(parseInt(value));
					})
					this.form.source = this.source_ids;
					console.log(that.source);

					this.purpose_ids = [];
					purposeList.forEach(function(value,i){
						that.purpose_ids.push(parseInt(value));
					})
					this.form.purpose = this.purpose_ids;	
				}
				
			})
		}else{
			this.form.id=0;
		}
	}
}	
</script>

<style scoped lang="scss">
	@import "../../static/css/form-item.css";  //引入方式
	body > .el-container {
		// border: 0.0625rem  solid red;
	}
	.el-header, .el-footer {
		// border: 0.0625rem #02a7f0 solid;
		
	}
	.el-main {
		// border: 0.0625rem  solid red;
	}
	
	.formDiv {
		border-radius: 1px;
		background-color: #F7F7F7;
		width:  78rem;
		// height: 135rem !important;
		margin: 1rem  auto ;
		// border: 0.0625rem  solid red;
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
	.headDiv{
		width: 82rem;
		margin: 0 auto;
	}
	.spanMsg{
		margin-left: 0.5rem;
		font-weight: 800;
	}
	.bodyForm{
		margin-top: 0.125rem;
		background-color: #FFF;
		margin-bottom: 0.125rem;
		// border: 0.0625rem  solid red;
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
	.formRemark{
		width: 76.5rem;
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
		// margin-left: -4rem;
		padding: 0 !important;
		text-align: left;
		// margin: 0;
		// border: 0.0625rem solid red;
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
		// height: 2rem;
		text-align: left;
		margin-left: 2rem;
		margin-top: 1rem;
	}
	.checkForm{
		text-align: left;
		float: left;
		width: 78rem;
		// border: 0.0625rem  solid orange;
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
	.PayeeDiv{
		width: 10rem;
		height: 2rem;
		line-height: 2rem;
		border: 0.0625rem solid ;
		margin: 1rem 2rem;
		background-color: orange;
		color: #FFF;
		border-radius: 3rem;
	}
	.textSpan{
		display:inline-block;
		font-size: 0.8rem;
		border-radius: 1rem;
		background-color: orange;
		color: #fff;
		height: 1.5rem;
		width: 7rem;
		text-align: center;
		line-height: 1.5rem;
	}
	.setTextSpan{
		display:inline-block;
		font-size: 0.8rem;
		background-color: #02a7f0;
		color: #fff;
		height: 1.5rem;
		width: 9rem;
		text-align: center;
		line-height: 1.5rem;
		border-radius: 0.3rem;
		margin-left: 1rem;
		cursor: pointer;
	}
</style>
