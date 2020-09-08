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
					<el-col :span="4">
						<div class="grid-content bg-purple">
							<span class="loginSpan">{{userInfo.username}}</span>
							<el-button class="exitBtn" click="loadLogin">退出</el-button>
						</div>
					</el-col>
				</el-row>
			</el-header>
			<el-main>
				<div class="tableDiv">
					<div class="tableHeader">
						<el-form ref="form" :model="form">
							<el-row :span="20">
								<el-col :span="2">
									<el-select v-model="form.searchType" placeholder="搜索类型" style="width: 8rem;">
										<el-option label="搜索类型" value=""></el-option>
										<el-option label="汇款人" value="sender"></el-option>
										<el-option label="收款人" value="payee"></el-option>
									</el-select>
								</el-col>
								<el-col :span="4" style="width: 12rem;padding: 0;text-align: left;">
									<el-input v-model="form.keyword" placeholder="请输入搜索的内容" style="width: 10rem;"></el-input>
								</el-col>
								<el-col :span="2">
									<el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
								</el-col>
								<el-col class="line" :span="1" style="width: 1rem; margin: 0;line-height: 2rem;">-</el-col>
								<el-col :span="2" style=" margin: 0;">
									<el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
								</el-col>
								<el-col :span="2">
									<el-select v-model="form.state" placeholder="搜索类型" style="width: 8rem;">
										<el-option label="全部" value=""></el-option>
										<el-option label="审核中" value="0"></el-option>
										<el-option label="已通过" value="1"></el-option>
										<el-option label="未通过" value="2"></el-option>
									</el-select>
								</el-col>
								<el-col class="line" :span="2">
									<el-button type="primary" @click="loadLogin">搜 索</el-button>
								</el-col>
								<el-col class="line" :span="2" style=" margin-left: -3rem;">
									<el-button @click="loadLogin">重 置</el-button>
								</el-col>
								<el-col class="line" :span="2">
									<el-button @click="loadLogin">重 置</el-button>
								</el-col>
							</el-row>
						</el-form>
					</div>
					<div class="tableBody">
						<el-table :data="tableData" style="width: 100%" border>
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
				form: {
					searchType: '',
					keyword: '',
					startDate: '',
					endDate: '',
					state: '1',
				},
				imageUrl: require('../../static/image/u95.png'),
				fit: '',
				tableData:[],
				
			}

		},
		methods: {
			onSubmit() {
				console.log(this.form);
			},
			loadLogin() {
				this.$router.push('/login');
			},
			stateFormat(row, column) {
				console.log(row,'row')
				console.log(column.property,'column')
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
					if (row.type === '0') {
					  return '待审核'
					} else if (row.type ==='1') {
					  return '已通过'
					} else if (row.type === '2') {
					  return '被驳回'
					}
				}
				
			}

		},
		mounted() {
			this.$api.remitList().then((response)=>{
				console.log(response)
				this.tableData= response.data.rows;
			})
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
</style>
