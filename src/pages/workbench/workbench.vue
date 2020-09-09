<template>
	<div id="workbench">
		<el-container>
			<el-header>
				<el-row>
					<el-col :span="20">
						<div class="grid-content bg-purple ">
							<div class="logoDiv">
								<el-image class="topImage" :src="imageUrl" :fit="fit"></el-image>
								<el-link :underline="false" class="topLink">工作台</el-link>
							</div>
						</div>
					</el-col>
					<el-col :span="2">
						<div class="grid-content bg-purple">
							<span  class="loginSpan">{{userInfo.username}}</span> &nbsp;&nbsp;
						</div>
					</el-col>
					<el-col :span="2">
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
						<el-table :data="tableData" style="width: 100%" border  :row-class-name="tableRowClassName">
							<el-table-column prop="id" label="序号" width="50">
							</el-table-column>
							<el-table-column prop="sendername" label="汇款人" width="100">
							</el-table-column>
							<el-table-column prop="type" label="类型" width="50" :formatter = "stateFormat">
							</el-table-column>
							<el-table-column prop="currency" label="币种" width="100">
							</el-table-column>
							<el-table-column prop="money" label="金额" width="80">
							</el-table-column>
							<el-table-column prop="purpose_text" label="资金来源" width="140">
							</el-table-column>
							<el-table-column prop="source_text" label="资金用途" width="140">
							</el-table-column>
							<el-table-column prop="sender[0].out_bankname" label="收款人1" width="80">
							</el-table-column>
							<el-table-column prop="sender[1].out_bankname" label="收款人2" width="80">
							</el-table-column>
							<el-table-column prop="createtime" label="申请日期" width="160">
							    <template slot-scope="scope">{{scope.row.createtime| dateYMDHMSFormat}}</template>
							</el-table-column>
							<el-table-column prop="state" label="状态" width="100" :formatter = "stateFormat">
							</el-table-column>
							<el-table-column label="操作"  fixed="right" >
							      <template slot-scope="scope">
							        <el-button
							          size="mini"
							          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							        <el-button
							          size="mini"
							          type="danger"
							          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							      </template>
							</el-table-column>
						</el-table>
					</div>
					<div class="block">
					    <el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page="currentPage"
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
					offset:0,
					limit:5
				},
				rules:{},
				imageUrl: require('../../static/image/u95.png'),
				fit: '',
				tableData:[],
				currentPage:0,
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
				})
			},
			loadLogin() {
				this.$router.push('/login');
			},
			stateFormat(row, column) {
				if(column.property=='type'){
					if (row.type === '0') {
					  return ''
					} else if (row.type ==='1') {
					  return '买入'
					} else if (row.type === '2') {
					  return '卖出'
					}
				}
				if(column.property=='state'){
					if (row.type == '0') {
					  return '待审核'
					} else if (row.type =='1') {
					  return '已通过'
					} else if (row.type == '2') {
					  return '被驳回'
					}
				}
				
			},
			handleSizeChange(val) {
				this.ruleForm.limit=val;
				this.onSubmit();
			},
			handleCurrentChange(val) {
				console.log(val)
				this.ruleForm.offset = val-1;
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
	
		},
		mounted() {
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
