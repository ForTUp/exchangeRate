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
						<el-button>默认按钮</el-button>
						<el-button type="primary">主要按钮</el-button>
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
	        {
	          url: require("")
	        },
	        {
	          url: require("")
	        },
	        {
	          url: require("")
	        }
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
<style scoped>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
   .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
	body > .el-container {
	margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
	line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
	line-height: 320px;
	}
	.el-carousel__item h3 {
	  color: #475669;
	  font-size: 14px;
	  opacity: 0.75;
	  line-height: 300px;
	  margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
	  background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n + 1) {
	  background-color: #d3dce6;
	}
	img {
	  /*设置图片宽度和浏览器宽度一致*/
	  width: 100%;
	  height: inherit;
	}
</style>
