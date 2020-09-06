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
							<el-link :underline="false" >为什么选择我们</el-link>
						</div>
						<div class="topLinkDiv">
							<el-link :underline="false" >联系我们</el-link>
						</div>
					</div>
				</el-col>
				  <el-col :span="4" :push="4" class="headerColLast">
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
					
					<div class="coreContent">
							<h1>为什么选我们</h1>
					</div>
					<div class="coreContent">
							<h1>联系我们</h1>
					</div>
				</div>
			</el-main>
			<el-footer>
				<div class="buttom">
					<span>&copy; 2020 Wenzhou Finance Group Ltd by 3A IT Solutions. All rights reserved.  Privacy</span>
				</div>
			</el-footer>
		</el-container>
		
		<el-dialog title="货币兑换计算器" :visible.sync="dialogFormVisible" width="20%" >
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
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">计 算</el-button>
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
				  url: require('../../static/image/banner1.png')
				},
				{
				  url: require('../../static/image/u95.png')
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
			  form:{
				  money:0,
				  from:'',
				  to:''
			  },
			  dialogFormVisible:false,
			  formLabelWidth:'100px',
			  currencyList:[]
			  
	    };
	  },
	  methods: {
	    setSize: function() {
	      // 通过浏览器宽度(图片宽度)计算高度
	      this.bannerHeight = (400 / 1920) * this.screenWidth;
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
						sessionStorage.clear()
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
		onSubmit(){
			
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
		
		border: 0.0625rem solid red;
		height: 120rem;
		width: 70rem;
		margin: 0 auto;
		margin-top: 2rem !important;
	}
	.coreHead{
		margin: 0 auto;
		height: 3rem;
		width: 30rem;
		border: 0.0625rem solid blue;
		padding: 0;
		
	}
	.coreContent{
		height: 22rem;
		border: 0.0625rem solid blue;
		margin-top: 2rem;
	}
	.coreContentList{
		height: 22rem;
		width: 22rem;
		border: 0.0625rem solid orange;
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
</style>
