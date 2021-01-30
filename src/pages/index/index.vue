<template>
	<div id="index">
		<div class="head">
			<div class="headDiv">
				<div class="topLinkDiv">
					<el-image class="topImage  "
					      :src="imageUrl"
					      :fit="fit"></el-image>
				</div>
				<div class="topLinkDiv" >
					<el-link :underline="false"  type="primary" @click="goTop">首页</el-link>
				</div>
				<div class="topLinkDiv">
					<el-link :underline="false" @click="goRate">实时汇率</el-link>
				</div>
				<div class="topLinkDiv" style="width: 15rem;">
					<el-link :underline="false" @click="goRegister">为什么选择我们</el-link>
				</div>
				<div class="topLinkDiv">
					<el-link :underline="false" @click="goContact">联系我们</el-link>
				</div>
				<div class="topLinkDiv topLinkDivFirst" >
					<div v-if="userInfo==null" class="loginDiv">
						<el-button  class="vipButton" @click="vipApply" >会员申请</el-button>
					</div>
					<div v-if="userInfo==null" class="loginDiv">
						<el-button type="primary" class="loginButton " @click="loadLogin" > 登录 </el-button>
					</div>
					<div  v-if="userInfo!=null" class="loginDiv">
						<el-button  class="loginButton loginoutButton" @click="loginout">退出登录</el-button>
					</div>
					<div  v-if="userInfo!=null" class="loginDiv">
						<el-link class="userName" :underline="false" @click="goToWork">{{userInfo.username}}</el-link>
					</div>
					
				</div>
			</div>
		</div>
		<el-container>
			<el-main>
				<div id="banner" class="form-wrap-top">
				    <!--动态将图片轮播图的容器高度设置成与图片一致--><!-- @click.native="linkTo" -->
					 <el-carousel class="lun_imgs" height="312px" ref="carousel" >
					   <el-carousel-item class="lun_img" v-for="item in imgList" v-bind:key="item.url" >
						 <img class="bannerImg" :src="item.url" ref="bannerHeight" @load="imgLoad"/>
					   </el-carousel-item>
					 </el-carousel>
				</div>
				<!--货币兑换 -->
				<!-- <div id="showCurrencyDiv" class="iocnDiv currency"  style="cursor:pointer; marign-left: 0;">
					
				</div> -->
				
				<!--微信入口 -->
				<div class="iocnDiv  weixin">
					<div class="iocnClick" @click="dialogFormVisible = true">
						<i class="iconfont iconhuobiduihuan1"></i><br>
						<span >货币兑换</span>
					</div>
					<div class="iocnClick" @click="dialogWeiXin = true">
						<i class="iconfont iconWeChat"></i><br>
						<span >公众号</span>
					</div>
					<div class="iocnClick">
						<i class="iconfont iconQQ"></i><br>
						<span >在线客服</span>
					</div>
				</div>
				
				<!--中间件 -->
				<div class="coreService">
					<div class="coreHead rate"> 
						<h1>实时汇率</h1>
					</div>
					<div class="coreContent" >
						<div class="tableHeader" style="margin-bottom: 2rem;padding-bottom: 2rem;padding-left: 1rem;">
							<el-form ref="nowForm" :model="nowForm" >
								<el-row :span="20">
									<el-col :span="3">
										<span>持有币种</span>
									</el-col>
									<el-col :span="3"  style="margin-left: 21rem;">
										<span>兑换币种</span>
									</el-col>
								</el-row>
								<el-row :span="20">
									<el-col :span="3">
										<el-select v-model="nowForm.from" placeholder="请选择" clearable filterable class="">
											<el-option
											  v-for="item in currencyList"
											 :key="item.code"
											 :label="item.name+item.code"
											 :value="item.code">
											</el-option>
										 </el-select>
									</el-col>
									<el-col :span="3" >
										<el-input v-model="nowForm.money" type="number" placeholder="" ></el-input>
									</el-col>
									<el-col :span="1" style="width: 8rem;text-align: center;">
										<el-button style="border: 0.0625rem solid #0080FF;" @click="changeFiex"><i style="color: #0080FF;" class="iconfont iconjiaohuan"></i></el-button>
									</el-col>
									<el-col :span="3">
										<el-select v-model="nowForm.to" placeholder="请选择" clearable filterable style="padding-right: 0;">
											<el-option
											  v-for="item in currencyList"
											 :key="item.code"
											 :label="item.name+item.code"
											 :value="item.code">
											</el-option>
										 </el-select>
									</el-col>
									<el-col :span="4" style=" margin: 0;">
										<el-input v-model="nowForm.totalMoney" disabled></el-input>
									</el-col>
								</el-row>
							</el-form>
						</div>
						<div class="coreContentTable">
							 <el-table
							      :data="tableData"
							      style="width: 100%">
							      <el-table-column
							        label="Code"
							        width="180">
									<template slot-scope="scope">
										<img class="curr_image" :src="scope.row.currurl1" />
										&nbsp;
										<img class="curr_image" :src="scope.row.currurl2" />
										<!-- {{scope.row.currurl}} -->
									</template>
							      </el-table-column>
							      <el-table-column
							        prop="currency_Label"
							        label="Currency"
							        width="280">
							      </el-table-column>
							      <el-table-column
							        prop="exchange11"
							        label="Cash buy">
							      </el-table-column>
								  <el-table-column
								    prop="exchange12"
								    label="Cash Sale">
								  </el-table-column>
								  <el-table-column
								    prop="exchange21"
								    label="Remittance buy">
								  </el-table-column>
								  <el-table-column
								    prop="exchange22"
								    label="Remittance Sale">
								  </el-table-column>
							</el-table>
						</div>
						<!-- <div class="block">
						  <el-pagination
							@current-change="handleCurrentChange"
							:current-page.sync="current_page"
							:page-size="per_page"
						    layout="prev, pager, next"
						    :total="total">
						  </el-pagination>
						</div> -->
					</div>
					<div class="coreHead">
						<h1>三大核心服务项目</h1>
					</div>
					<div class="coreContent" style="height: 28rem;">
						<div class="coreContentList ">
							<h1>双向汇款</h1>
							<ul class="coreUl">
								<li><i class="el-icon-check" style="color:cornflowerblue;"></i><span>资金安全</span></li>
								<li><i class="el-icon-check" style="color:cornflowerblue;"></i><span>诚信可靠</span></li>
							</ul>
						</div>
						<div class="coreContentList">
							<h1>国际结算</h1>
							<ul class="coreUl coreUlTe">
								<li><i class="el-icon-check" style="color:cornflowerblue;"></i><span>满足任何种类货币的兑换</span></li>
								<li><i class="el-icon-check" style="color:cornflowerblue;"></i><span>满足多种结算方式：现金，电汇，银行</span></li>
							</ul>
						</div>
						<div class="coreContentList">
							<h1>现金兑换</h1>
							<ul class="coreUl">
								<li><i class="el-icon-check" style="color:cornflowerblue;"></i><span>无需手续费</span></li>
								<li><i class="el-icon-check" style="color:cornflowerblue;"></i><span>无金额限制</span></li>
							</ul>
						</div>
					</div>
					<div class="form-wrap-app" style="width: 100%;height: 2rem;"></div>
					<div class="coreContent chanceDiv " >
						<div class="coreHead ">
							<h1>为什么选我们</h1>
						</div>
						<div class="textDiv">
							<p>
								温州集团旗下Blue Rate Finance始建于澳大利亚悉尼 (澳洲金融牌照号AUSTRAC Registration Number：IND100583009-001)，作为一家提供多元化金融产品及服务的综合性金融机构，立足于房地产金融并稳步发展，目前已成为集地产投资、房屋贷款、个人及商业贷款、风险投资及其他金融业务在内的综合性金融集团。
							</p>
							<p>
								Blue Rate Finance 拥有具二十多年中澳金融行业经验，贯通中西高度专业化，多元文化的资深管理团队 。凭借其对澳中两国金融、地产、经济及相关行业政策的深入了解，深耕于悉尼市场，在严格遵循金融行业法规的基础上，辅以严密的风险控制框架。
							</p>
							<p>
								Blue Rate Finance与温州速汇（Blue Rate Remittance）共同为华侨同胞提供移民、留学、工作、置业的汇兑及投资服务，实现资产的保值增值。
								
							</p>
							
						</div>
						<div><h3>Blue Rate Finance愿与您精诚合作，携手同进，共绘蓝图。</h3></div>
					</div>
					
					
					<div class="coreHead contact">
						<h1>联系我们</h1>
					</div>
					<div class="coreContent" style="height: 32rem;">
						<div class="mapDiv" >
							<div class="mapHead">
								<ul>
									<li class="mapHeadTitle"><span>Chatswood</span></li>
									<li class="mapHeadText"><span>周一至周五 9:30-5:30 营业，周六周日休息</span></li>
								</ul>
							</div>
							<!-- <div id="map1" ref="map1"></div> -->
							<gmap-map :center="center" :zoom="zoom" class="map">
							    <gmap-marker :position="center"  :clickable="true" :draggable="true" />
							</gmap-map>
							<!-- <baidu-map class="map"  :center="center" :zoom="zoom" @read="handler">
							</baidu-map> -->
							<div class="mapButtom">
								<ul>
									<li ><i class="el-icon-mobile"></i><span>+61 2 9884 7388</span></li>
									<li ><i class="el-icon-message"></i><span>Wenzhou@bluerate.net</span></li>
									<li ><i class="el-icon-location-outline"></i><span>Shop 5, 379 Victoria Ave, Chatswood NSW 2067</span></li>
								</ul>
							</div>
						</div>
						<div class="mapDiv">
							<div class="mapHead">
								<ul>
									<li class="mapHeadTitle"><span>Hornsby</span></li>
									<li class="mapHeadText"><span>周一至周五 9:30-5:30 营业，周六周日休息</span></li>
								</ul>
							</div>
							<!-- <baidu-map class="map"  :center="center1" :zoom="zoom" @read="handler1">
							</baidu-map> -->
							<gmap-map :center="center1" :zoom="zoom" class="map">
							    <gmap-marker :position="center1"  :clickable="true" :draggable="true" />
							</gmap-map>
							<div class="mapButtom">
								<ul>
									<li ><i class="el-icon-mobile"></i><span>+61 2 9987 0090</span></li>
									<li ><i class="el-icon-message"></i><span>Wenzhou@bluerate.net</span></li>
									<li ><i class="el-icon-location-outline"></i><span>Shop 3095, Westfield Hornsby 2077</span></li>
								</ul>
							</div>
						</div>
						<div class="mapDiv">
							<div class="mapHead">
								<ul>
									<li class="mapHeadTitle"><span>Auburn</span></li>
									<li class="mapHeadText"><span>周一至周五 9:30-5:30 营业，周六周日休息</span></li>
								</ul>
							</div>
							<!-- <baidu-map class="map"  :center="center2" :zoom="zoom" @read="handler2">
							</baidu-map> -->
							<gmap-map :center="center2" :zoom="zoom" class="map">
							    <gmap-marker :position="center2"  :clickable="true" :draggable="true" />
							</gmap-map>
							<div class="mapButtom">
								<ul>
									<li ><i class="el-icon-mobile"></i><span>+61 2 8065 8700</span></li>
									<li ><i class="el-icon-message"></i><span>Wenzhou@bluerate.net</span></li>
									<li ><i class="el-icon-location-outline"></i><span>Level 1, 80-82 South Parade,Auburn 21447</span></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<div class="buttom">
						<span>&copy; 2020 Wenzhou Finance Group Ltd by 3A IT Solutions. All rights reserved.  Privacy</span>
					</div>
				</div>
			</el-main>
			
		</el-container>
		
		<el-dialog title="货币兑换计算器" :visible.sync="dialogFormVisible" width="30%" >
		  <el-form :model="form">
		    <el-form-item label="卖出币种:" :label-width="formLabelWidth">
			  
			  <el-select v-model="form.to" placeholder="请选择" class="formSelect" clearable filterable >
			  	<el-option
			  	  v-for="item in currencyList"
			  	 :key="item.code"
			  	 :label="item.name+item.code"
			  	 :value="item.code">
			  	</el-option>
			   </el-select>
		    </el-form-item>
			<el-form-item label="买入币种:" :label-width="formLabelWidth">
			  <el-select v-model="form.from" placeholder="请选择" class="formSelect" clearable filterable >
			  	<el-option
			  	  v-for="item in currencyList"
			  	 :key="item.code"
			  	 :label="item.name+item.code"
			  	 :value="item.code">
			  	</el-option>
			   </el-select>
			</el-form-item>
			<el-form-item label="卖出金额:" :label-width="formLabelWidth" >
			  <el-input v-model="form.money" type="number" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="买入金额:" :label-width="formLabelWidth" >
			  <el-input v-model="form.totalMoney" disabled autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="汇率:" :label-width="formLabelWidth" >
			  <el-input v-model="form.currencyRate" disabled autocomplete="off"></el-input>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="getExchangeInfo">计 算</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="微信公众号" :visible.sync="dialogWeiXin" width="30%" height="30%" class="weiXinDialog">
			<el-image 
			    :src="weiXinurl" 
				:fit="fit"
			    >
			</el-image>
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import {appConfig} from '../../../config.js'
import { gmapApi } from 'vue2-google-maps'

export default {
	computed:{...mapGetters(['userId','userInfo'])},
	name:'index',
	data() {
	    return {
			imageUrl:require('../../static/image/u95.png'),
			
			  // 图片地址数组
			imgList: [
			    {
				  url: require('../../static/image/banner.png'),
				},
			  ],
			  // 图片父容器高度
			  bannerHeight: 1000,
			  // 浏览器宽度
			  screenWidth: 0,
			  fit:'',
			  tableData:[],
			  current_page:1,
			  per_page:10000,
			  total:0,
			  //货币计算表单
			  form:{
				  money:'',
				  from:'AUD',
				  to:'',
				  totalMoney:'',
				  currencyRate:''
			  },
			  dialogFormVisible:false,
			  formLabelWidth:'100px',
			  currencyList:[],
			  //百度地图数据
			  // -33.795084, 151.185378
			  center: {lng: 151.1831468, lat: -33.7952714},
			  center1: {lng: 151.1002963, lat: -33.7049113},
			  center2: {lng: 151.0306249, lat: -33.8500415},
			  zoom:15,
			  //实时汇率
			  nowForm:{
				  from:'AUD',
				  to:'',
				  money:1,
				  totalMoney:''
			  },
			  dialogWeiXin:false,
			  weiXinurl:require('../../static/image/qrcode_for_gh_cb5bd9556a2e_1280.jpg'),
			  // apiUrl:appConfig
			  
	    };
	  },
	  methods: {
		imgLoad(){
			 // this.$nextTick(()=>{
				//  this.bannerHeight=this.$refs.bannerHeight[0].height;
				//  console.log(this.$refs.bannerHeight[0].height,'this.$refs.bannerHeight[0].height')
			 // })
		},
	    // setSize: function() {
	    //   // 通过浏览器宽度(图片宽度)计算高度
	    //   this.bannerHeight = (500 / 1920) * this.screenWidth;
	    // },
		loadLogin(){
			this.$router.push('/login');
		},
		vipApply(){
			this.$router.push('/vipApply');
		},
		goToWork(){
			this.$router.push('/workbench');
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
					if(response.code==1){
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
		handleCurrentChange(val){
			this.current_page=val;
			this.$api.getExchangeList({current_page:this.current_page,per_page:this.per_page}).then((response) =>{
				const {data} = response;
				this.total=data.total;
				console.log(data)
				if(response.code==1){
					let List = []
					data.rows.forEach((el)=>{
						el.currency_Label = el.currencyF + el.currencyF_Name + " / " + el.currencyT + el.currencyT_Name;
						el.currurl1=appConfig.apiUrl+ el.currencyF_icon;
						el.currurl2=appConfig.apiUrl+ el.currencyT_icon;
						List.push(el)
					})
					this.tableData= List;
					console.log(List,'List')
				}
			})
			console.log(this.total,'total');
		},
		handler({BMap,map}){
			console.log(BMap,map);
			// this.center.lng= 151.184048;
			// this.center.lat=-33.797626;
			this.zoom = 15;
		},
		handler1({BMap,map}){
			console.log(BMap,map);
			// this.center1.lng= 116.404;
			// this.center1.lat=39.915;
			this.zoom = 15;
		},
		handler2({BMap,map}){
			console.log(BMap,map);
			// this.center2.lng= 116.404;
			// this.center2.lat=39.915;
			this.zoom = 15;
		},
		getExchangeInfo(){
			if(this.form.from==null || this.form.from == '' ){
				this.$message({
					message: '请选择卖出币种',
					type: 'warning'
				})
				return;
			}
			if(this.form.to ==null || this.form.to == ''){
				this.$message({
					message: '请选择买入币种',
					type: 'warning'
				})
				return;
			}
			if(this.form.money == null || this.form.money == ''){
				this.$message({
					message: '请输入买入金额:',
					type: 'warning'
				})
				return;
			}
			this.$api.getExchangeInfo(this.form).then((response)=>{
				console.log(response)
				let {data} = response;
				if(response.code==1){
					this.form.totalMoney=(this.form.money/data.exchange11).toFixed(2);
					this.form.currencyRate =data.exchange11;
					console.log(this.form.totalMoney)
				}else{
					this.$message({
						message: response.msg,
						type: 'warning'
					})
				}
				
			})
		},
		changeFiex(){
			if(this.nowForm.from==null || this.nowForm.from == '' ){
				this.$message({
					message: '请选择持有币种',
					type: 'warning'
				})
				return;
			}
			if(this.nowForm.to ==null || this.nowForm.to == ''){
				this.$message({
					message: '请选择兑换币种',
					type: 'warning'
				})
				return;
			}
			if(this.nowForm.money == null || this.nowForm.money == ''){
				this.$message({
					message: '请输入兑换金额',
					type: 'warning'
				})
				return;
			}
			this.$api.getExchangeInfo(this.nowForm).then((response)=>{
				console.log(response)
				let {data} = response;
				if(response.code==1){
					this.nowForm.totalMoney=(this.nowForm.money*data.exchange11).toFixed(2);
					console.log(this.nowForm.totalMoney)
				}else{
					this.$message({
						message: response.msg,
						type: 'warning'
					})
				}
				
			})
			
		},
		// 跳到注册
		goRegister() {
			// 注册表单盒子的类名为 form-wrap-app
			this.$el.querySelector('.form-wrap-app').scrollIntoView();
		},
		goContact(){
			this.$el.querySelector('.contact').scrollIntoView();
		},
		goTop(){
			this.$el.querySelector('.form-wrap-top').scrollIntoView();
		},
		goRate(){
			this.$el.querySelector('.rate').scrollIntoView();
		},
		// setPlace(place) {
		// 	this.place = place
		// },
		// setDescription(description) {
		// 	this.description = description;
		// },
		// usePlace(place) {
		// 	if (this.place) {
		// 		var newPostion = {
		// 			lat: this.place.geometry.location.lat(),
		// 			lng: this.place.geometry.location.lng(),
		// 		};
		// 		this.center = newPostion;
		// 		this.position =  newPostion;
		// 		this.place = null;
		// 	}
		// },
		// updateMaker: function(event) {
		// 	console.log('updateMaker, ', event.latLng.lat());
		// 	this.position = {
		// 		lat: event.latLng.lat(),
		// 		lng: event.latLng.lng(),
		// 	}
		// },
		// pushAddress(res) {
		//       this.$emit('mark', res, this.position)
		// },
		// pointToAddress(lat, lng, backcall) {
		//   // 实例化Geocoder服务用于解析地址
		//   var geocoder = new this.google.maps.Geocoder();
		//   // 地理反解析
		//   geocoder.geocode({ location: new this.google.maps.LatLng(lat, lng) }, function geoResults(results, status) {
		// 	if (status === this.google.maps.GeocoderStatus.OK) {
		// 	  backcall(results[0].formatted_address);
		// 	} else {
		// 	  console.log('：error ' + status);
		// 	}
		//   });
		// }
	  },
	  mounted() {
	 //    this.screenWidth = window.innerWidth;
	 //    // this.setSize();
		// this.imgLoad()
	 //    // 窗口大小发生改变时,调用一次
	 //    window.onresize = () => {
	 //      this.screenWidth = window.innerWidth;
		//   this.bannerHeight=this.$refs.bannerHeight[0].height;
		//   this.imgLoad();
	 //      // this.setSize();
	 //    };
		//获取费率列表
		this.$api.getExchangeList({current_page:this.current_page,per_page:this.per_page}).then((response) =>{
			const {data} = response;
			console.log(response,'response');
			this.total=data.total;
			if(response.code==1){
				let List = []
				data.rows.forEach((el)=>{
					el.currency_Label = el.currencyF + el.currencyF_Name + " / " + el.currencyT + el.currencyT_Name;
					el.currurl1=appConfig.apiUrl+ el.currencyF_icon;
					el.currurl2=appConfig.apiUrl+ el.currencyT_icon;
					List.push(el)
				})
				this.tableData= List;
			}
		});
		//获取货币列表
		this.$api.getCurrencyList({current_page:1,per_page:this.per_page,status:"normal"}).then((response) =>{
			console.log(response.data.rows)
			this.currencyList= response.data.rows;
		})
	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	/deep/.el-select .el-input__inner {
		padding-right: 0;
	}
	.el-input--suffix .el-input__inner {
		padding-right: 0;
	}
	.el-col-4 {
		width: 20.66667%;
	}
	.tableHeader .el-row .el-col[data-v-1badc801] {
		padding: 8px;
	}
	
	#banner{
		height:31.25rem !important;
	}
	.lun_imgs {
		height:31.25rem !important;
	}
	.lun_img{
		height:31.25rem !important;
	}
	img {
	  /*设置图片宽度和浏览器宽度一致*/
	  width: 100%;
	  height: inherit;
	  object-fit:cover;
	}
	.bannerImg{
		height:31.25rem !important;
	}
	html{
		// overflow-x: hidden !important;
	}
	body{
		// overflow-x: hidden !important;
	}
	body > .el-container {
		// margin: 0 auto !important;
		// border: 0.0625rem solid pink;
		// font-family: 'ArialMT', 'Arial', sans-serif;
		// border-radius:0rem;
		overflow-y: hidden;
		margin: 0 auto !important;
		
	}
	.index{
		// width: 100%;
	}
	.head {
		color: #333;
		text-align: center;
		line-height: 5rem;
		width: 100%;
		margin: 0 auto !important;
		border: 0.0625rem solid #F7F7F7;
		// border: 0.0625rem solid red;
		height: 5rem !important;
		padding: 0;
		position: fixed;
		// overflow: hidden;
		.headDiv{
			// border: 0.0625rem solid blue;
			width: 100rem;
			height: 5rem;
			margin: 0 auto;
			// overflow: hidden;
			top: 0px;
			left: 0px;
			right: 0px;
			position: inherit;
			.topLinkDiv{
				// overflow: hidden;
				width: 10rem;
				height: 5rem;
				float: left;
				a{
					font-size: 1.5rem;
					font-weight: 700 !important;
				}
			}
			.loginDiv{
				height: 5rem;
				float: right;
				margin-right: 2rem;
			}
			.topLinkDivFirst{
				width:20rem;
				position: absolute;
				right: 0;
			}
		}
	}
	.footer{
		width: 99%;
		color: #333;
		clear:both;
		text-align: center;
		line-height: 5rem;
		margin: 0 auto !important;
		border: 0.0625rem solid #F7F7F7;
		// border: 0.0625rem solid red;
		height: 5rem !important;
		background-color: #F7F7F7;
		font-size: 1.5rem;
		
		
	}
	.el-main {
		 background-color: #F7F7F7;
		 color: #333;
		 text-align: center;
		 margin: 0 auto !important;
		 border: 0.0625rem solid #F7F7F7;
		 // border: 0.0625rem solid orangered;
		 padding: 0;
		 // position: relative;
		 visibility: inherit;
	}
	
	.userName{
		margin-right: 2rem;
		margin-left: 1rem;
	}
	
	.vipButton{
		border: 0.0625rem #02a7f0 solid;
		color: #02a7f0;
		border-radius:0.125rem !important;
	}
	.coreService{
		// border: 0.0625rem solid red;
		height: 120rem;
		width: 100rem;
		margin: 0 auto;
		margin-top: 2rem !important;
	}
	.coreHead{
		height: 3rem;
		width: 100%;
		// border: 0.0625rem solid blue;
		padding: 0;
		
	}
	.coreContent{
		// border: 0.0625rem solid blue;
		margin-top: 2rem;
		width: 100%;
		.coreContentList{
			height: 22rem;
			width: 30%;
			// border: 0.0625rem solid orange;
			float: left;
			// margin-left: 1.73rem;
			margin-top: 3% ;
			margin-left: 2.5%;
			background-color: #fff;
			text-align: center;
			
			.coreUl{
				padding-inline-start:0 !important;
				li{
					margin-top: 1rem;
					text-align: center !important;
					// margin-left: -4rem;
					span{
						margin-left: 0.5rem;
						font-size: 1rem !important;
						
					}
				}
			}
			h1{
				margin-top: 8rem;
				font-size: 2rem !important;
			}
		}
		.coreContentList:hover {
			color: #02a7f0 !important;
			font-weight: bold;
		}
		.mapDiv{
			width: 25%;
			height: 28rem;
			float: left;
			// border: 0.0625rem solid red;
			text-align: left;
			// margin-left: 7.7rem;
			// margin-top: 3% ;
			margin-left: 6%;
			.map {
			  width: 100%;
			  height: 18rem;
			  // border: 0.0625rem solid #FFF;
			  border-radius: 1rem 1rem 1rem 1rem;
			}
			.mapHead{
				width: 100%;
				// border: 0.0625rem solid blue;
				// padding: 0;
				padding-bottom: 0.5rem;
				ul{
					padding: 0;
					width: 100%;
					margin: 0;
				}
				.mapHeadTitle{
					font-size: 1rem;
					font-weight: bold;
				}
				.mapHeadText{
					font-size: 0.5rem;
				}
			}
			.mapButtom{
				width: 100%;
				// border: 0.0625rem solid blue;
				padding: 0;
				ul{
					padding: 0;
					width: 100%;
					height: 2rem;
					margin: 0;
					font-weight: 600;
					font-size: 1rem;
					li{
						span{
							margin-left: 0.1rem;
						}
						margin-top: 0.5rem;
					}
					
					
				}
			}
		}
	}
	.iocnDiv{
		width: 5rem;
		background-color: #fff;
		border: 0.0625rem solid  #CCCCCC;
		border-radius: 0.7rem 0rem 0rem 0.7rem;
		position: absolute;
		padding-bottom: 1rem;
		right: 0;
		top:40%;
		z-index: 999;
		.iocnClick{
			cursor: pointer;
			width: 100%;
			height: 4rem;
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			border: 0.0625rem solid #CCCCCC;
			margin-top: 1rem;
			text-align: center;
			span{
				font-size: 1rem !important;
			}
			i{
				font-size: 2rem;
			}
		}
		
	}
	.currency{
		top:40rem;
		position: fixed;
	}
	.weixin{
		position: fixed;
	}
	.el-dialog{
		.el-input{
			width: 50%;
			padding-right: 0;
		}
		.el-select{
			width: 50%;
		}
		
	}
	
	
	.chanceDiv{
		// border: 0.0625rem solid red;
		border-radius: 2rem;
		background-color: #EEE;
		padding: 2rem 0 6rem 0;
	}
	.block{
		margin-top: 1rem;
		.el-pagination{
			text-align: left;
		}
	}
	.tableHeader{
		background-color: #fff;
		.el-row{
			// border: 0.0625rem solid red;
			padding: 0;
			text-align: left;
			line-height: 3rem;
			.el-col{
				// border: 0.0625rem solid blue;
				height: 3rem;
				padding: 0.5rem;
				.el-input{
					width: 100%;
				}
				span{
					font-weight: bold;
				}
			}
			
		}
	}
	.textDiv{
		text-align: left;
		// border: 0.0625rem solid red;
		padding: 2rem;
		p{
			font-size: 1.5rem;
			line-height: 3rem;
		}
	}
	.weiXinDialog{
		border: 0.0625rem solid red;
		.el-dialog__body{
			width: 100% !important;
			height: 100% !important;
			text-align: center !important;
			.el-image{
				width: 100%;
				height: 100%;
				margin: 0 auto !important;
				img{
					width: 1280px !important;
					height: 1280px !important;
				}
			}
		}
	}
	.curr_image{
		width: 3.125rem;
		height: 2rem;
	}
</style>
