<template>
	<view class="content-box">
		<view class="option">
			<template v-for="(item,index) in option">
				<view v-if="item.open" @tap="to_active(item,index)" :key="index" :class="[item.active?'active':'']">
					{{item.label}}
				</view>
			</template>
		</view>
		<view class="from">
			<view class="font-30 flex-tip">
				<view style="width:240rpx">收款账户</view>
				<view @tap="choose_card">
					<view class="wechat">{{option[option_active].name}}</view>
					<view class="c7">提现手续费{{charge.toFixed(2)}}%</view>
				</view>
			</view>
			<view class="font-30" style="margin-top:50rpx">提现金额</view>
			<view class="account-input-box">
				<view class="font-48">￥</view>
				<input class="account-input inline" v-model="option[option_active].from.money" type="number"
					:placeholder="`请输入金额`">
			</view>
			<view class="font-26 flex">
				<view>可提现余额{{user_money}}</view>
				<view class="all-with" @tap="all_number">全部提现</view>
			</view>
			<view class="buttom font-32" @tap="subimt">
				立即提现
			</view>
		</view>
		<view class="rich-box">
			<rich-text :nodes="contxt"></rich-text>
		</view>
		<pay-account v-model="card_dialog" @change="change_pay" @to_add="to_add" :bank_id="option[1].from.bank_id"
			:go="false" :list="card_list"></pay-account>
		<!-- 支付密码 -->
		<!-- <pay-password ref="pay" v-model="pay_dialog" :show="false" @check_word="save"></pay-password> -->
		<pay-password ref='payPassword' @onChange='payPwdTap'></pay-password>
		<no-password v-model="no_password" @check="set_password" />

	</view>
</template>

<script>
	import payAccount from '../components/pay_account.vue'
	// import payPassword from 'index/components/pay_password.vue'
	import payPassword from 'index/components/payPassword_new.vue'
	import noPassword from '../../index/components/no_password.vue'

	export default {
		data() {
			return {
				contxt: '',
				option: [{
						label: '微信零钱',
						value: '',
						active: true,
						open: false,
						from: {
							money: '',
							paypwd: '',
							type: 2, //提交的方式
						},
						bank_type: 2, //是否开启该方式
						list: 0, //获取收款账户的参数
						name: '',
					},
					{
						label: '支付宝',
						value: '',
						active: false,
						open: false,
						from: {
							bank_id: '',
							money: '',
							paypwd: '',
							type: 3,
						},
						bank_type: 3,
						list: 2,
						name: '请选择',

					},
					{
						label: '银行卡',
						value: '',
						active: false,
						open: false,
						from: {
							bank_id: '',
							money: '',
							paypwd: '',
							type: 1
						},
						bank_type: 1,
						list: 1,
						name: '请选择',
					}
				],
				option_active: 0,
				card_list: [],
				card_dialog: false,
				user_money: '0.00',
				distribut_min: "",
				charge: 0,
				pay_dialog: false,
				no_password: false,
				payPwd: ''
			}
		},
		async onShow() {
			await this.getRule()
			await this.$http('get|api/User/is_paypwd').then(res => {
				this.no_password = true; //没有密码
			}).catch(() => {
				this.get_type().then(_ => {
					this.option[0].name = `微信${this.user.nickname}`
				})
			})
			if (this.user.is_attestation == 0) {
				uni.showModal({
					title: '提示',
					content: '您还未实名！',
					confirmText: '去实名',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/my/shiming/shiming'
							})
						} else if (res.cancel) {
							uni.navigateBack()
						}
					}
				});
			}
		},
		methods: {
			getRule() {
				this.$http("post|api/Article/regulation", {
					id: 9
				}).then(res => {
					this.contxt = res.result.topic_content
				})
			},
			get_type() {
				return this.$http('get|api/User/withdrawals', {
					bank_type: this.option[this.option_active].bank_type
				}).then(res => {
					//withdraw_type  1是银行卡，2是微信，3是支付宝
					res.result.withdraw_type.forEach(el => {
						switch (el) {
							case "1":
								this.option[2].open = true
								break;
							case "2":
								this.option[0].open = true
								break;
							case "3":
								this.option[1].open = true
								break;
						}
					})
					if (res.result.withdraw_type.length != 3) {
						let withdraw_type = res.result.withdraw_type
						let type = +withdraw_type[0]
						this.option.forEach(el => {
							el.active = false;
						})
						let find = this.option.findIndex(ro => ro.bank_type == type);
						this.info_option(withdraw_type);
					}
					this.user_money = res.result.user_money;
					this.charge = +res.result.charge;
					this.distribut_min = +res.result.distribut_min
					this.card_list = res.result.bankcard_list ? res.result.bankcard_list.map(row => {
						row.active = false
						return row
					}) : []
				})
			},
			info_option(arr) {
				// 2,3,1
				let find_2 = arr.find(ro => ro == 2)
				if (find_2) {
					this.option[0].active = true;
					this.option_active = 0;
					return
				}
				let find_3 = arr.find(ro => ro == 3)
				if (find_3) {
					this.option[1].active = true;
					this.option_active = 1;
					return
				} else {
					this.option[2].active = true;
					this.option_active = 2;
				}
			},
			subimt() {
				if (this.option[this.option_active].from.money < this.distribut_min) {
					this.$toastApp(`提现不能小于${this.distribut_min}`, 'none');
					return
				}
				if (!/^(-?\d+)(\.\d+)?$/.test(this.option[this.option_active].from.money)) {
					this.$toastApp('金额格式不正确', 'none');
					return
				}
				switch (this.option_active) {
					case 0:
						// this.pay_dialog = true
						this.$refs.payPassword.showPay()
						break;
					case 1:
					case 2:
						if (this.option[this.option_active].from.bank_id == '') {
							this.$toastApp('请先选择收款账户', 'none');
							return;
						}
						// this.pay_dialog = true
						this.$refs.payPassword.showPay()
						break;
				}
			},
			// save(e) {
			// 	switch (this.option_active) {
			// 		case 0:
			// 			this.option[0].from.paypwd = e;
			// 			this.$http('post|api/User/withdrawals', this.option[0].from).then(res => {
			// 				this.$toastApp(res.msg);
			// 				setTimeout(() => {
			// 					uni.navigateBack();
			// 				}, 2000)
			// 			}).catch(e => {
			// 				this.$toastApp(e.msg, 'none');
			// 				this.$refs.pay.passworld = []
			// 			})
			// 			break;
			// 		case 1:
			// 		case 2:
			// 			this.option[this.option_active].from.paypwd = e;
			// 			this.$http('post|api/User/withdrawals', this.option[this.option_active].from).then(res => {
			// 				this.$toastApp(res.msg);
			// 				setTimeout(() => {
			// 					uni.navigateBack();
			// 				}, 2000)
			// 			}).catch(e => {
			// 				this.$toastApp(e.msg, 'none');
			// 				this.$refs.pay.passworld = []
			// 			})
			// 			break;
			// 	}
			// },
			//支付密码输入
			payPwdTap(i) {
				this.payPwd = i.join('');
				if (this.payPwd.length == 6) {
					uni.showLoading({
						mask: true
					})
					switch (this.option_active) {
						case 0:
							this.option[0].from.paypwd = this.payPwd;
							this.$http('post|api/User/withdrawals', this.option[0].from).then(res => {
								this.$toastApp(res.msg);
								uni.navigateBack();
							}).catch(e => {
								this.$toastApp(e.msg, 'none');
								this.$refs.pay.passworld = []
							})
							break;
						case 1:
						case 2:
							this.option[this.option_active].from.paypwd = this.payPwd;
							this.$http('post|api/User/withdrawals', this.option[this.option_active].from).then(res => {
								this.$toastApp(res.msg);
								uni.navigateBack();
							}).catch(e => {
								this.$toastApp(e.msg, 'none');
								this.$refs.pay.passworld = []
							})
							break;
					}
				}
			},
			change_pay(e) {
				this.option[this.option_active].name = `${e.bankname}(${e.bank_card})`
				this.option[this.option_active].from.bank_id = e.bank_id;
				this.card_dialog = false
				console.log(e);
				//选择收款账号
			},
			to_active(item, index) {
				this.option.forEach(el => {
					el.active = false;
				})
				item.active = true;
				this.option_active = index;
			},
			choose_card() {
				if (this.option_active !== 0) {
					this.$http('get|api/User/withdrawals', {
						bank_type: this.option[this.option_active].list
					}).then(res => {
						this.card_list = res.result.bankcard_list ? res.result.bankcard_list.map(row => {
							row.active = false
							return row
						}) : [];
						this.card_dialog = true;
					})
				}
			},
			to_add() {
				let type = this.option[this.option_active].bank_type;
				uni.navigateTo({
					url: `/my/pay_account/pay_account?bank_type=${type==1?1:2}`
				})
				this.card_dialog = false;
			},
			all_number() {
				this.option[this.option_active].from.money = this.user_money;
			},
			set_password() {
				//todo设置密码
				this.no_password = false;
				setTimeout(() => {
					uni.navigateTo({
						url: '/my/mdf_password/mdf_password'
					});
				}, 500)
			},
		},
		watch: {
			card_dialog(val) {
				if (val) {
					this.noScroll();
				} else {
					this.remScroll();
				}
			}
		},
		computed: {
			user() {
				return this.$store.getters.get_user;
			}
		},
		components: {
			payAccount,
			payPassword,
			noPassword
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}
	
	.content-box{
		width: 100vw;
		overflow-x: hidden;
	}

	.all-with {
		color: var(--theme);
	}

	.option {
		display: flex;
		background-color: #ffffff;

		>view {
			flex: 1;
			text-align: center;
			font-size: 30rpx;
			line-height: 90rpx;
			color: #808080;
		}

		.active {
			color: var(--theme);
			position: relative;
		}

		.active::after {
			position: absolute;
			content: '';
			width: 96rpx;
			height: 2rpx;
			background-color: var(--theme);
			bottom: 0;
			left: 50%;
			margin-left: -48rpx;
		}
	}

	.from {
		padding: 70rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		margin-top: 20rpx;

		.account-input-box {
			border-bottom: 1rpx solid #F0F0F0;
			display: flex;
			align-items: center;
		}

		.account-input {
			line-height: 100rpx;
			height: 100rpx;
			flex: 1;
		}

		.flex {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;
			color: #BEBEBE;
		}

		.buttom {
			margin: 0 auto;
			margin-top: 100rpx;
			width: 620rpx;
			height: 90rpx;
			background: var(--theme);
			border-radius: 45rpx;
			text-align: center;
			line-height: 90rpx;
			color: #ffffff;
		}

		.flex-tip {
			display: flex;
		}

		.wechat {
			color: var(--theme);
		}

		.c7 {
			color: #C7C7C7;
		}
	}
	.rich-box{
		width: 100vw;
		padding: 30rpx;
		overflow: hidden;
		rich-text{
			width: 690rpx;
		}
	}
</style>
