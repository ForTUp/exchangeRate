<template>
	<div id="workbench">
		<el-container>
			<el-header>
				<el-row>
					<el-col :span="20">
						<div class="grid-content bg-purple ">
							<div class="logoDiv">
								<div @click="goToIndex" style="cursor: pointer;">
								<el-image class="topImage" :src="imageUrl" :fit="fit"></el-image>
								</div>
								<el-link :underline="false" class="topLink">工作台</el-link>
							</div>
						</div>
					</el-col>
					<el-col :span="2" style="margin-top: 0.5rem;">
						<div class="grid-content bg-purple">
							<!-- <span  class="loginSpan">{{userInfo.username}}</span> &nbsp;&nbsp; -->
							<el-link class="loginSpan" :underline="false" @click="goToIndex">{{userInfo.username}}</el-link>
						</div>
					</el-col>
					<el-col :span="2" style="margin-top: 0.5rem;">
						<div class="grid-content bg-purple">
							<el-button class="exitBtn" @click="loginout" style="margin-right: 1rem;">退出</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
			<el-main>
				<div class="tableDiv">
					<div class="tableHeader">
						<el-form ref="ruleForm" :model="ruleForm" :rules="rules"  >
							<el-row :span="20">
								<el-col :span="2">
									<el-select v-model="ruleForm.searchType" placeholder="搜索类型" style="width: 8rem;">
										<el-option label="搜索类型" value=""></el-option>
										<el-option label="汇款人" value="sender"></el-option>
										<el-option label="收款人" value="payee"></el-option>
									</el-select>
								</el-col>
								<el-col :span="4" style="width: 12rem;padding: 0;text-align: left;">
									<el-input v-model="ruleForm.keyword" placeholder="请输入搜索的内容" style="width: 10rem;"></el-input>
								</el-col>
								<el-col :span="2">
									<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startDate" style="width: 100%;"></el-date-picker>
								</el-col>
								<el-col class="line" :span="1" style="width: 1rem; margin: 0;line-height: 2rem;">-</el-col>
								<el-col :span="2" style=" margin: 0;">
									<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;"></el-date-picker>
								</el-col>
								<el-col :span="2">
									<el-select v-model="ruleForm.state" placeholder="搜索类型" style="width: 8rem;">
										<el-option label="全部" value="all"></el-option>
										<el-option label="审核中" value="0"></el-option>
										<el-option label="已通过" value="1"></el-option>
										<el-option label="未通过" value="2"></el-option>
									</el-select>
								</el-col>
								<el-col class="line" :span="2">
									<el-button type="primary" @click="onSubmit('ruleForm')">搜 索</el-button>
								</el-col>
								<el-col class="line" :span="2" style=" margin-left: -3rem;">
									<el-button @click="resetForm('ruleForm')">重 置</el-button>
								</el-col>
								<el-col class="line" :span="2" :push="2">
									<el-button @click="loadApply">+汇款申请</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<div class="tableBody">
						<el-table :data="tableData" style="width: 100%" border  :row-class-name="tableRowClassName" highlight-current-row>
							<el-table-column prop="id" label="序号" width="50" >
							</el-table-column>
							<el-table-column prop="remit_name" label="汇款人" width="100">
							</el-table-column>
							<el-table-column prop="type" label="类型" width="50" :formatter = "stateFormatType">
							</el-table-column>
							<el-table-column prop="currency" label="币种" width="100">
							</el-table-column>
							<el-table-column prop="money" label="金额" width="80">
							</el-table-column>
							<el-table-column prop="purpose_text" label="资金来源" width="140">
							</el-table-column>
							<el-table-column prop="source_text" label="资金用途" width="140">
							</el-table-column>
							<el-table-column prop="sender_name1" label="收款人1" width="80">
							</el-table-column>
							<el-table-column prop="sender_name2" label="收款人2" width="80">
							</el-table-column>
							<el-table-column prop="createtime" label="申请日期" width="160">
							    <template slot-scope="scope">{{scope.row.createtime| dateYMDHMSFormat}}</template>
							</el-table-column>
							<el-table-column prop="state" label="状态" width="100" :formatter = "stateFormatState">
							</el-table-column>
							<el-table-column label="操作"  fixed="right" >
							      <template slot-scope="scope">
							       
							        <el-button
							          size="mini"
							          type="danger"
							          @click="handleDelete(scope.row)">删除</el-button>
									  <el-button
									   v-if="scope.row.state!='1'"
									    size="mini"
									    @click="handleEdit(scope.row)">编辑</el-button>
							      </template>
							</el-table-column>
						</el-table>
					</div>
					<div class="block">
					    <el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page="ruleForm.currentPage"
					      :page-sizes="[5,10,15,20]"
					      :page-size="5"
					      layout="total, sizes, prev, pager, next, jumper"
					      :total="total">
					    </el-pagination>
					  </div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		computed: { ...mapGetters(['userId', 'userInfo'])
		},
		name: "workbench",
		data() {
			return {
				ruleForm: {
					searchType: '',
					keyword: '',
					startDate: '',
					endDate: '',
					state: 'all',
					current_page:1,
					per_page:5
				},
				rules:{},
				imageUrl: require('../../static/image/u95.png'),
				fit: '',
				tableData:[],
				total:0
				
			}

		},
		methods: {
			resetForm(formName) {
				this.ruleForm.searchType='';
				this.ruleForm.keyword='';
				this.ruleForm.startDate='';
				this.ruleForm.endDate='';
				this.ruleForm.state='all';
			},
			onSubmit() {
				console.log(this.ruleForm);
				this.$api.remitList(this.ruleForm).then((response)=>{
					console.log(response)
					let {data} =response;
					this.total=data.total
					this.tableData= data.rows;
					console.log(this.tableData,'tableData');
				})
			},
			loadLogin() {
				this.$router.push('/login');
			},
			stateFormatType(row) {
				if (row.type === '0') {
				  return ''
				} else if (row.type ==='1') {
				  return '买入'
				} else if (row.type === '2') {
				  return '卖出'
				}
				
			},
			stateFormatState(row) {
				if (row.state ==='0') {
				  return '待审核'
				} else if (row.state ==='1') {
				  return '已通过'
				} else if (row.state === '2') {
				  return '被驳回'
				}
				
			},
			handleSizeChange(val) {
				console.log(val,'per_page')
				this.ruleForm.per_page=val;
				this.onSubmit();
			},
			handleCurrentChange(val) {
				console.log(val,'current_page')
				this.ruleForm.current_page = val;
				this.onSubmit();
			},
			tableRowClassName({row, rowIndex}){
				let state = row.state;
				console.log(state,'state');
				if (state == '0') {
				   return 'warning-row';
				} else if (state =='1') {
				  return 'success-row';
				} else if (state == '2') {
				  return ''
				}
			},
			handleEdit(row){
				console.log(row)
				let id = row.id;
				this.$router.push({name:'workbenchApply',params:{id:id}});
			},
			handleDelete(row){
				console.log(row)
				let id = row.id;
				 this.$confirm('此操作将删除汇款信息, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$api.remitDel({id:id}).then((response)=>{
				  	console.log(response);
				  	if(response.code=='1'){
				  		this.$notify({
				  		  title: '成功',
				  		  message: '删除汇款信息',
				  		  type: 'success'
				  		});
				  		this.onSubmit();
				  	}else{
				  		this.$notify({
				  		  title: '失败',
				  		  message: '删除汇款信息',
				  		  type: 'warning'
				  		});
				  	}
				  })
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			},
			loadApply(){
				this.$router.push('/workbenchApply');
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
			goToIndex(){
				this.$router.push('/index');
			},
			
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
			this.onSubmit()
		}
	}
</script>

<style scoped lang="scss">
	body>.el-container {
		width: 82rem;
	}

	.el-header,
	.el-footer {
		width: 82rem;
	}

	.el-main {
		width: 82rem;
	}
	.el-table {
		// border: 0.0625rem solid red;
		.warning-row {
		    color: red !important;
		  }
		 .success-row {
		    color: #f0f9eb !important;
		  }
	}
	.tableDiv {
		width: 80rem;
		// border: 0.0625rem solid red;
		margin: 0 auto;

		.el-form {
			width: 80rem;
			margin: 0;
			// border: 0.0625rem solid blue;
			height: 4rem;

			.el-row {
				width: 80rem;
				// border: 0.0625rem solid yellow;
				padding: 0;

				.el-col {
					width: 8rem;
					padding: 0;
					// border: 0.0625rem solid red;
					height: 3rem;
					text-align: center;
					margin: 0 auto;
					margin-left: 1rem;
				}
			}
		}

	}
	
	.block{
		text-align: left;
		margin-top: 1rem;
	}
	
	
</style>
