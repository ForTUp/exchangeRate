<template>
	<div id="index">
		<el-container>
			<el-header>
				<el-row :gutter="20">
				<el-col :span="12" :push="4" class="headerCol">
					<div class="grid-content bg-purple ">
						<div class="logoDiv">
							<el-image class="topImage"
							      :src="imageUrl"
							      :fit="fit"></el-image>
						</div>
						<div class="topLinkDiv topLinkDivFirst" >
							<el-link :underline="false"  type="primary">首页</el-link>
						</div>
						<div class="topLinkDiv">
							<el-link :underline="false" @click="goRegister">为什么选择我们</el-link>
						</div>
						<div class="topLinkDiv">
							<el-link :underline="false" @click="goContact">联系我们</el-link>
						</div>
					</div>
				</el-col>
				  <el-col :span="4" :push="4" class="headerColLast" style="margin-top: 0.5rem;">
					<div class="grid-content bg-purple loginout" v-if="userInfo!=null">
						<span  class="userName">{{userInfo.username}}</span>
						<el-button  class="loginButton loginoutButton" @click="loginout">退出登录</el-button>
					</div>
					<div v-if="userInfo==null" class="loginDiv">
						<el-button type="primary" class="loginButton " @click="loadLogin"> 登录 </el-button>
						<el-button  class="vipButton" @click="vipApply" >会员申请</el-button>
					</div>
				  </el-col>
				</el-row>
			</el-header>
			<el-main>
				<div id="banner">
				    <!--动态将图片轮播图的容器高度设置成与图片一致-->
					 <el-carousel class="lun_imgs" ref="carousel" @click.native="linkTo">
					   <el-carousel-item class="lun_img" v-for="item in imgList" v-bind:key="item.url" >
						 <img :src="item.url"/>
					   </el-carousel-item>
					 </el-carousel>
				</div>
				<!--货币兑换 -->
				<div id="showCurrencyDiv" class="iocnDiv currency" @click="dialogFormVisible = true">
					<i class="iconfont iconhuobiduihuan1"></i><br>
					<span>货币兑换</span>
				</div>
				
				<!--微信入口 -->
				<div class="iocnDiv  weixin">
					<i class="iconfont iconWeChat"></i><br>
					<span>公众号</span>
				</div>
				
				<!--中间件 -->
				<div class="coreService">
					<div class="coreHead">
						<h1>三大核心服务项目</h1>
					</div>
					<div class="coreContent">
						<div class="coreContentList coreContentListFirst">
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
					
					<div class="coreHead">
						<h1>实时汇率</h1>
					</div>
					<div class="coreContent">
						<div class="tableHeader" style="margin-bottom: 2rem;">
							<el-form ref="nowForm" :model="nowForm" >
								<el-row :span="20">
									<el-col :span="4">
										<span>持有币种</span>
									</el-col>
									<el-col :span="4" :push="7" style="margin-left: -0.8rem;">
										<span>兑换币种</span>
									</el-col>
								</el-row>
								<el-row :span="20">
									<el-col :span="4">
										<el-select v-model="nowForm.from" placeholder="请选择" clearable filterable class="">
											<el-option
											  v-for="item in currencyList"
											 :key="item.code"
											 :label="item.name+item.code"
											 :value="item.code">
											</el-option>
										 </el-select>
									</el-col>
									<el-col :span="4" >
										<el-input v-model="nowForm.money" placeholder="" ></el-input>
									</el-col>
									<el-col :span="1" style="width: 8rem;text-align: center;">
										<el-button style="border: 0.0625rem solid #0080FF;" @click="changeFiex"><i style="color: #0080FF;" class="iconfont iconjiaohuan"></i></el-button>
									</el-col>
									<el-col :span="4">
										<el-select v-model="nowForm.to" placeholder="请选择" clearable filterable >
											<el-option
											  v-for="item in currencyList"
											 :key="item.code"
											 :label="item.name+item.code"
											 :value="item.code">
											</el-option>
										 </el-select>
									</el-col>
									<el-col :span="4" style=" margin: 0;">
										<el-input v-model="nowForm.totalMoney" readonly></el-input>
									</el-col>
								</el-row>
							</el-form>
						</div>
						<div class="coreContentTable">
							 <el-table
							      :data="tableData"
							      style="width: 100%">
							      <el-table-column
							        prop="currencyF_Name"
							        label="Code"
							        width="180">
							      </el-table-column>
							      <el-table-column
							        prop="currencyT"
							        label="Currency"
							        width="180">
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
								    prop="exchange21"
								    label="Remittance Sale">
								  </el-table-column>
							</el-table>
						</div>
						<div class="block">
						  <el-pagination
							@current-change="handleCurrentChange"
							:current-page.sync="offset"
							:page-size="limit"
						    layout="prev, pager, next"
						    :total="total">
						  </el-pagination>
						</div>
					</div>
					
					<div class="coreContent chanceDiv form-wrap-app">
						<div class="coreHead ">
						<h1>为什么选我们</h1>
						<p>
							温州集团旗下Blue Rate Finance始建于澳大利亚悉尼 (澳洲金融牌照号AUSTRAC Registration Number：IND100583009-001)，作为一家提供多元化金融产品及服务的综合性金融机构，立足于房地产金融并稳步发展，目前已成为集地产投资、房屋贷款、个人及商业贷款、风险投资及其他金融业务在内的综合性金融集团。
							Blue Rate Finance 拥有具二十多年中澳金融行业经验，贯通中西高度专业化，多元文化的资深管理团队 。凭借其对澳中两国金融、地产、经济及相关行业政策的深入了解，深耕于悉尼市场，在严格遵循金融行业法规的基础上，辅以严密的风险控制框架。
							Blue Rate Finance与温州速汇（Blue Rate Remittance）共同为华侨同胞提供移民、留学、工作、置业的汇兑及投资服务，实现资产的保值增值。
							Blue Rate Finance愿与您精诚合作，携手同进，共绘蓝图。
						</p>
					</div>
					</div>
					<div class="coreHead contact">
						<h1>联系我们</h1>
					</div>
					<div class="coreContent" style="height: 30rem !important;">
						<div class="mapDiv" style="margin-left: 0 !important;">
							<div class="mapHead">
								<ul>
									<li class="mapHeadTitle"><span>Chatswood</span></li>
									<li class="mapHeadText"><span>周一至周五 9:30-5:30 营业，周六周日休息</span></li>
								</ul>
							</div>
							<baidu-map class="map"  :center="center" :zoom="zoom" @read="handler">
							</baidu-map>
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
							<baidu-map class="map"  :center="center1" :zoom="zoom" @read="handler1">
							</baidu-map>
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
							<baidu-map class="map"  :center="center2" :zoom="zoom" @read="handler2">
							</baidu-map>
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
			</el-main>
			<el-footer>
				<div class="buttom">
					<span>&copy; 2020 Wenzhou Finance Group Ltd by 3A IT Solutions. All rights reserved.  Privacy</span>
				</div>
			</el-footer>
		</el-container>
		
		<el-dialog title="货币兑换计算器" :visible.sync="dialogFormVisible" width="30%" >
		  <el-form :model="form">
		    <el-form-item label="卖出币种:" :label-width="formLabelWidth">
			  
			  <el-select v-model="form.from" placeholder="请选择" class="formSelect" clearable filterable >
			  	<el-option
			  	  v-for="item in currencyList"
			  	 :key="item.code"
			  	 :label="item.name+item.code"
			  	 :value="item.code">
			  	</el-option>
			   </el-select>
		    </el-form-item>
			<el-form-item label="买入币种:" :label-width="formLabelWidth">
			  <el-select v-model="form.to" placeholder="请选择" class="formSelect" clearable filterable >
			  	<el-option
			  	  v-for="item in currencyList"
			  	 :key="item.code"
			  	 :label="item.name+item.code"
			  	 :value="item.code">
			  	</el-option>
			   </el-select>
			</el-form-item>
			<el-form-item label="买入金额:" :label-width="formLabelWidth" >
			  <el-input v-model="form.money" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="计算结果:" :label-width="formLabelWidth" >
			  <el-input v-model="form.totalMoney" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="费率:" :label-width="formLabelWidth" >
			  <el-input v-model="form.currencyFD" autocomplete="off"></el-input>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="getExchangeInfo">计 算</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed:{...mapGetters(['userId','userInfo'])},
	name:'index',
	data() {
	    return {
			imageUrl:require('../../static/image/u95.png'),
			
			  // 图片地址数组
			imgList: [
			    {
				  url: require('../../static/image/banner.png')
				},
			  ],
			  // 图片父容器高度
			  bannerHeight: 1000,
			  // 浏览器宽度
			  screenWidth: 0,
			  fit:'',
			  tableData:[],
			  offset:0,
			  limit:8,
			  total:0,
			  //货币计算表单
			  form:{
				  money:1,
				  from:'',
				  to:'',
				  totalMoney:'',
				  currencyFD:''
			  },
			  dialogFormVisible:false,
			  formLabelWidth:'100px',
			  currencyList:[],
			  //百度地图数据
			  // -33.795084, 151.185378
			  center: {lng: 151.185378, lat: -33.795084},
			  center1: {lng: 151.101350, lat: -33.703887},
			  center2: {lng: 151.032826, lat: -33.849612},
			  zoom:15,
			  //实时汇率
			  nowForm:{
				  from:'',
				  to:'',
				  money:1,
				  totalMoney:''
			  }
	    };
	  },
	  methods: {
	    setSize: function() {
	      // 通过浏览器宽度(图片宽度)计算高度
	      this.bannerHeight = (500 / 1920) * this.screenWidth;
	    },
		loadLogin(){
			this.$router.push('/login');
		},
		vipApply(){
			this.$router.push('/vipApply');
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
		handleCurrentChange(val){
			this.offset=val;
			this.$api.getExchangeList({offset:this.offset,limit:this.limit}).then((response) =>{
				const {data} = response;
				this.total=data.total;
				if(response.code==1){
					this.tableData= data.rows;
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
					this.form.totalMoney=this.form.money*data.currencyFD;
					this.form.currencyFD =data.currencyFD;
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
					this.nowForm.totalMoney=this.nowForm.money*data.currencyFD;
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
			}
		
	  },
	  mounted() {
	    this.screenWidth = window.innerWidth;
	    this.setSize();
	    // 窗口大小发生改变时,调用一次
	    window.onresize = () => {
	      this.screenWidth = window.innerWidth;
	      this.setSize();
	    };
		
		//获取费率列表
		this.$api.getExchangeList({offset:this.offset,limit:this.limit}).then((response) =>{
			const {data} = response;
			console.log(response,'response');
			this.total=data.total;
			if(response.code==1){
				this.tableData= data.rows;
			}
			console.log(this.tableData,'tabledata')
		});
		//获取货币列表
		this.$api.getCurrencyList().then((response) =>{
			this.currencyList= response.data.rows;
		})
	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	img {
	  /*设置图片宽度和浏览器宽度一致*/
	  width: 100%;
	  height: inherit;
	}
	body > .el-container {
		width: 100rem;
		margin: 0 auto !important;
		border: 0.0625rem solid #F7F7F7;
		font-family: 'ArialMT', 'Arial', sans-serif;
		border-radius:0rem;
	}
	
	.el-header, .el-footer {
		color: #333;
		text-align: center;
		line-height: 3.75rem;
		width: 100rem;
		margin: 0 auto !important;
		border: 0.0625rem solid #F7F7F7;
		height: 5rem !important;
	}
	.el-main {
		 width: 100rem;
		 background-color: #FFF;
		 color: #333;
		 text-align: center;
		 margin: 0 auto !important;
		 border: 0.0625rem solid #F7F7F7;
		 padding: 0;
		 position: relative;
	}
	.topLinkDiv{
		with:8rem;
		height: 3.75rem;
		float: left;
		margin-left:2rem;
		margin-top: -3rem;
	}
	.headerCol{
		margin-left: -4rem !important;
	}
	.headerColLast{
		margin-left: 8rem;
	}
	.topLinkDivFirst{
		margin-left:12rem !important;
	}
	.userName{
		margin-right: 2rem;
		margin-left: 1rem;
	}
	
	.vipButton{
		border: 0.0625rem #02a7f0 solid;
		color: #02a7f0;
		margin-right: -10rem;
		border-radius:0.125rem !important;
	}
	.coreService{
		
		// border: 0.0625rem solid red;
		height: 120rem;
		width: 70rem;
		margin: 0 auto;
		margin-top: 2rem !important;
	}
	.coreHead{
		margin: 0 auto;
		height: 3rem;
		width: 30rem;
		// border: 0.0625rem solid blue;
		padding: 0;
		
	}
	.coreContent{
		height: 22rem;
		// border: 0.0625rem solid blue;
		margin-top: 2rem;
	}
	.coreContentList{
		height: 22rem;
		width: 22rem;
		// border: 0.0625rem solid orange;
		float: left;
		margin-left: 1.73rem;
		background-color: #fff;
		text-align: center;
		.coreUl{
			li{
				margin-top: 1rem;
				text-align: center !important;
				margin-left: -4rem;
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
		.coreUlTe{
			li{
				text-align: left !important;
				margin-left: 0rem;
			}
		}
		
	}

	.coreContentListFirst{
		margin-left:0rem !important;
		
	}
	.el-footer{
		 background-color: #F7F7F7;
	}
	.loginDiv{
		margin-left: -7rem;
	}
	.loginout{
		margin-left: 2rem;
	}
	.iocnDiv{
		width: 3.2rem;
		height: 3.2rem;
		background-color: #fff;
		border: 0.0625rem solid  #8F8F8F;
		border-radius: 0.7rem 0rem 0rem 0.7rem;
		position: absolute;
		right: 0;
		span{
			font-size: 0.3rem !important;
		}
		i{
			font-size: 1.6rem;
		}
		
	}
	
	.currency{
		top:20rem;
	}
	.weixin{
		top:24rem;
	}
	.el-dialog{
		.el-input{
			width: 50%;
		}
		.el-select{
			width: 50%;
		}
		
	}
	.mapDiv{
		width: 18rem;
		height: 30rem;
		float: left;
		// border: 0.0625rem solid red;
		text-align: left;
		margin-left: 7.7rem;
		.map {
		  width: 18rem;
		  height: 18rem;
		  border: 0.0625rem solid #FFF;
		  border-radius: 1rem 1rem 1rem 1rem;
		}
		.mapHead{
			width: 100%;
			height: 3rem;
			// border: 0.0625rem solid blue;
			padding: 0;
			ul{
				padding: 0;
				width: 100%;
				height: 2rem;
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
			height: 8rem;
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
	
	.chanceDiv{
		border: 0.0625rem solid red;
		border-radius: 2rem;
		background-color: #EEE;
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
			height: 3rem;
			padding: 0;
			text-align: left;
			line-height: 3rem;
			.el-col{
				// border: 0.0625rem solid blue;
				height: 3rem;
				padding: 0;
				.el-input{
					width: 100%;
				}
				span{
					font-weight: bold;
				}
			}
			
		}
	}
</style>
