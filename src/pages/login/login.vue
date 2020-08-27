<template>
		<div id="index">
			<el-container>
				<el-header>
					<el-row :gutter="20">
					<el-col :span="18">
						<div class="grid-content bg-purple">
							<el-link >登录</el-link>
						</div>
					</el-col>
					  <el-col :span="4">
						<div class="grid-content bg-purple">
							<el-button>会员申请</el-button>
						</div>
					  </el-col>
					</el-row>
					
				</el-header>
				<el-main>
					<el-form ref="form" :model="form" label-width="200px">
						
						<span>登录 | Login</span>
					  <el-form-item label="账号/User ID：">
							<el-input v-model="form.name"></el-input>
					  </el-form-item>
					  <el-form-item label="密码/Password：">
							<el-input v-model="form.region"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="onSubmit">立即创建</el-button>
					  </el-form-item>
					</el-form>
				</el-main>
			</el-container>
		</div>
</template>

<script>
export default{
	name:"login",
	data() {
	return {
		form: {
			name: '',
			region: '',
			date1: '',
			date2: '',
			delivery: false,
			type: [],
			resource: '',
			desc: ''
			}
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		}
	}
}	
</script>

<style>
	.el-header, .el-footer {
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	.el-main {
		 background-color: #F7F7F7;
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
	
	.el-form{
		border-radius: 1px;
		background-color: #FFF;
		width:  500px;
		height: 620px;
		margin:100px   auto;
	}
	.el-input{
	}
</style>
