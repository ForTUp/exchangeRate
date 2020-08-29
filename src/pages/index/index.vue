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
						<el-button  class="vipButton" @click="vipApply">会员申请</el-button>
						<el-button  class="loginButton vipButton" @click="loadLogin">登录</el-button>s
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
export default {
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
	      screenWidth: 0
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
		}
	  },
	  mounted() {
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
