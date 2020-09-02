<template>
	<div id="index">
		<el-container>
			<el-header>
				<el-row :gutter="20">
				<el-col :span="16">
					<div class="grid-content bg-purple">
						<el-link type="primary" href="https://element.eleme.io" target="_blank">首页 </el-link>
						<el-link >服务项目</el-link>
						<el-link >实时汇率</el-link>
						<el-link >联系我们</el-link>
					</div>
				</el-col>
				  <el-col :span="8">
					<div class="grid-content bg-purple">
						<el-button  class="vipButton" @click="vipApply" v-if="username==null">会员申请</el-button>
						<el-button  class="loginButton vipButton" @click="loadLogin" v-if="username==null">登录 </el-button>
						<span v-if="username!=null">{{username}}</span>
						<el-button  class="loginButton vipButton" @click="loginout" v-if="username!=null">退出登录</el-button>
					</div>
				  </el-col>
				</el-row>
				
			</el-header>
			<el-main>
				<div id="banner">
				    <!--动态将图片轮播图的容器高度设置成与图片一致-->
				    <el-carousel :height="bannerHeight + 'px'">
				      <!--遍历图片地址,动态生成轮播图-->
				      <el-carousel-item v-for="item in imgList" :key="item">
				        <img :src="item" alt />
				      </el-carousel-item>
				    </el-carousel>
				</div>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed:{...mapGetters(['token','id','username','nickname','mobile','avatar','score','userId','createtime','expiretime','expiresIn'])},
	name:'index',
	data() {
	    return {
	      // 图片地址数组
	    imgList: [
	       /* {
	          url: require("")
	        },
	        {
	          url: require("")
	        },
	        {
	          url: require("")
	        } */
	      ],
	      // 图片父容器高度
	      bannerHeight: 1000,
	      // 浏览器宽度
	      screenWidth: 0,
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
			this.$get('/api/user/logout').then((response) => {
				console.log(response.data)
				const {data} = response;
				console.log(data)
				if(response.code>0){
					that.$store.commit("user/SET_USER_ID",null);
					that.$store.commit("user/SET_TOKEN",null);
					that.$store.commit("user/SET_USER_NAME",null);
					that.$store.commit("user/SET_MOBILE",null);
					that.$store.commit("user/SET_NICKNAME",null);
					that.$store.commit("user/SET_AVATER",null);
					that.$store.commit("user/SET_SCORE",null);
					that.$store.commit("user/SET_REMIND_COUNT",null);
					that.$store.commit("user/SET_CREATETIME",null);
					that.$store.commit("user/SET_EXPIRETIME",null);
					that.$store.commit("user/SET_EXPIRESIN",null);
					that.$message({
					  message: response.msg,
					  type: 'success'
					});
					that.$router.push('/');
				}else{
					 this.$message({
					  message: response.msg,
					  type: 'warning'
					});
				}
			}).catch(function(err){
				console.log(err)
			})
		}
	  },
	  mounted() {
		this.user_id = this.$store.state.user.userId;
	    // 首次加载时,需要调用一次
	    this.screenWidth = window.innerWidth;
	    this.setSize();
	    // 窗口大小发生改变时,调用一次
	    window.onresize = () => {
	      this.screenWidth = window.innerWidth;
	      this.setSize();
	    };
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
</style>
