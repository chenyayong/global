<template>
	<view class="page">
		<view class="my-user">
			<view class="message" @tap="to_message">
				<image src="/static/icon_11.png" class="seting-img" mode="" />
				<view class="tip font-16" v-if="user_message_count>0">{{user_message_count}}</view>
			</view>
			<image src="/static/icon_12.svg" class="seting-img seting" mode="" @tap="to_setting" />
			<view class="user">
				<view class="user-adv">
					<image :src="users.head_pic||'/static/user.svg'" mode="" @tap="go_login" />
					<view class="font-26">
						<view>
							<view v-if="users.nickname||users.mobile" class="inline ellipsis" style="max-width:250rpx"
								@tap="go_login">
								{{users.nickname||users.mobile}}
							</view>
							<view v-else class="inline ellipsis" style="max-width:250rpx" @tap="go_login">未登录</view>
							<view v-if="users.level_name" class="vip font-22 inline">{{users.level_name}}</view>
							<!--<view v-if="users.identity_name" class="vip font-22 inline">{{users.identity_name}}认证</view>-->
						</view>
						<view v-if="users.level_name">
							ID：{{users.user_id}}
						</view>
						<!--<view v-if="users.level != 1 && users.level_name" class="invite">-->
							<!--推荐码：{{users.encipher}}-->
							<!--<image src="/static/copy_icon_w.png" mode="" @tap="$copy(users.encipher)" />-->
						<!--</view>-->
					</view>
				</view>
				<!-- <image class="sign" v-if="users.is_sign===0" @tap="to_sign" src="/static/my_sign.png" mode="" />				
				<image class="sign" v-else src="/static/my_sign_active.png" mode="" />				 -->
			</view>
			<view class="user-msg">
				<view @tap="to_pay_detail">
					<view class="font-34 bold">{{users.total_amount||'-'}}</view>
					<view class="font-22">我的消费</view>
				</view>
				<view @tap="to_integral">
					<view class="font-34 bold">{{users.pay_points||'-'}}</view>
					<view class="font-22">积分抵扣券</view>
				</view>

				<!-- #ifdef APP-PLUS -->
				<view @tap="to_team">
					<view class="font-34 bold">{{users.group_count||'-'}}</view>
					<view class="font-22">我的客户</view>
				</view>
				<view @tap="to_contribution">
					<view class="font-34 bold">{{users.contribution_points||'-'}}</view>
					<view class="font-22">贡献值</view>
				</view>
				<!-- #endif -->

			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="wallet">
			<view class="my-wallet" @tap="to_mywallet">
				<view class="font-30">我的钱包</view>
				<view class="font-26">{{users.user_money?`￥${users.user_money}`:'***'}}</view>
			</view>
			<view class="wallt-msg">
				<view class="msg-item">
					<view class="wallet-small" @tap="to_reward(1)">
						<image src="/static/ticheng.png"></image>
						<view class="font-24">销售提成</view>
						<!-- <view class="font-30">{{users.into_commission}}</view> -->
					</view>
					<view class="wallet-small" @tap="to_reward(3)">
						<image src="/static/buzhu.png"></image>
						<view class="font-24">培育补助</view>
						<!-- <view class="font-30">{{users.agent}}</view> -->
					</view>
					<view class="right wallet-small" @tap="to_reward(4)">
						<image src="/static/reward.png"></image>
						<view class="font-24">奖励</view>
						<!-- <view class="font-30">{{users.profit}}</view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="order">
			<view class="my-order" @tap="to_order">
				<view class="font-30">我的订单</view>
				<view class="font-26">全部订单</view>
			</view>
			<view class="order-option">
				<view @tap="to_order_item('WAITPAY')">
					<image src="/static/padding_pay.png" class="image-44" mode="" />
					<view class="font-24">待付款</view>
					<view class="tip font-20" v-if="users.waitPay>0">{{users.waitPay}}</view>
				</view>
				<view @tap="to_order_item('WAITSEND')">
					<image src="/static/padding_ship.png" class="image-44" mode="" />
					<view class="font-24">待发货</view>
					<view class="tip font-20" v-if="users.waitSend>0">{{users.waitSend}}</view>
				</view>
				<view @tap="to_order_item('WAITRECEIVE')">
					<image src="/static/padding_card.png" class="image-44" mode="" />
					<view class="font-24">待收货</view>
					<view class="tip font-20" v-if="users.waitReceive>0">{{users.waitReceive}}</view>
				</view>
				<view @tap="to_order_item('WAITCCOMMENT')">
					<image src="/static/padding_evaluation.png" class="image-44" mode="" />
					<view class="font-24">待评价</view>
					<!-- <view class="tip font-22" v-if="users.return_count>0">{{users.return_count}}</view> -->
				</view>
				<view>
					<image src="/static/after_sale.png" class="image-44" mode="" @tap="to_sale" />
					<view class="font-24">退款/售后</view>
					<view class="tip font-20" v-if="users.return_count>0">{{users.return_count}}</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<view class="wallet" style="margin-top: 20rpx;" v-if="operator">
			<view class="my-wallet" @tap="to_operate">
				<view class="font-30">所属运营商</view>
				<view class="font-26"></view>
			</view>
			<view class="wallt-msg">
				<view class="msg-item">
					<view class="wallet-small">
						<image src="/static/center_name.png"></image>
						<view class="font-24">{{operator.operator_title}}</view>
						<!-- <view class="font-30">{{users.into_commission}}</view> -->
					</view>
					<view class="wallet-small">
						<image src="/static/center_peo.png"></image>
						<view class="font-24 address-txt">{{operator.service_address}}</view>
						<!-- <view class="font-30">{{users.agent}}</view> -->
					</view>
					<view class="right wallet-small">
						<image src="/static/center_phone.png"></image>
						<view class="font-24">{{operator.service_phone}}</view>
						<!-- <view class="font-30">{{users.profit}}</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="service">
			<view class="my-service">
				<view class="font-30">常用服务</view>
			</view>
			<view class="service-content">
				<!-- #ifdef APP-PLUS -->
				<view @tap="to_mywallet">
					<image src="/static/icon_4.png" mode="" />
					<view class="font-24">我的钱包</view>
				</view>
				<!-- #endif -->

				<!--<view @tap="to_agent">-->
					<!--<image src="/static/icon_5.png" mode="" />-->
					<!--<view class="font-24">个人认证</view>-->
				<!--</view>-->
				<view @tap="to_invite">
					<image src="/static/icon_6.png" mode="" />
					<view class="font-24">推广海报</view>
				</view>
				<view @tap="to_address">
					<image src="/static/icon_7.png" mode="" />
					<view class="font-24">地址管理</view>
				</view>
				<!-- #ifdef APP-PLUS -->
				<view @tap="to_pay_account">
					<image src="/static/icon_8.png" mode="" />
					<view class="font-24">收款账户</view>
				</view>
				<!-- #endif -->
				<!-- <view @tap="to_coupon">
						<image src="../static/coupon_icon.png" mode="" />
						<view class="font-24">优惠券</view>
					</view> -->
				<view @tap="my_collection">
					<image src="../static/test_1.svg" mode="" />
					<view class="font-24">我的收藏</view>
				</view>
				<view @tap="my_replace">
					<image src="../static/replace_pay.png" mode="" />
					<view class="font-24">我要代付</view>
				</view>
				<!-- #ifdef APP-PLUS -->
				<view @tap="server_img=true">
					<image src="/static/icon_10.png" mode="" />
					<view class="font-24">客服咨询</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<server-img v-model="server_img"></server-img>
		<bind-account v-model="show_bind" :set_mobel="set_mobel"></bind-account>
		<no-permission :title="title" :message="message" :botton="botton" v-model="permission_dialog"
			@change="permission_change"></no-permission>
		<no-conditions v-model="conditions.dialog" :conditions="conditions" @change="conditions_change" :ok="is_ok">
		</no-conditions>
	</view>
</template>

<script>
	import my from './my';
	import bindAccount from 'index/components/bind_account.vue';
	import noPermission from 'components/no_permission.vue';
	import noConditions from 'components/no_conditions.vue';
	export default {
		data() {
			return {
				operator: {},
				users: {
					p_name: {}
				},
				user_message_count: 0,
				server_img: false,
				show_bind: false,
				set_mobel: false,
				permission_dialog: false,
				title: '',
				message: '',
				botton: '',
				conditions: {
					title: '',
					message: '',
					botton: '',
					dialog: false
				},
				good_id: '',
				is_ok: false
			}
		},
		async onLoad() {
			await this.$http('get|api/MobileBase/checkLogin').then(res => {
				//没登陆
			}).catch(e => {
				this.$http('get|api/User/checkUserinfo').then(res => {
					this.$nextTick(() => {
						this.show_bind = true;
						this.set_mobel = true;
					})
				})
			})
		},
		onShow() {
			this.$http('get|api/User/index').then(res => {
				this.users = res.result.users;
				this.operator = res.result.operator
				console.log('----------------------------', res);
				uni.setStorageSync('level', res.result.users.level)
				this.user_message_count = res.result.user_message_count;
				if (/http/.test(this.users.head_pic)) {

				} else {
					this.users.head_pic = this.$image + this.users.head_pic;
				}
				this.$store.dispatch('set_user', this.users);
				uni.setStorageSync('setinvite', res.result.users.encipher);
				uni.setStorageSync('level', res.result.users.level);
			})
			this.remScroll();
			this.$http('get|api/User/contribution_points').then(res => {
				// console.log('贡献值',res);
			})
			this.$http('get|api/user/check_partner').then(res => {
				console.log(res);
				this.conditions = {
					title: '你已经达到条件',
					message: res.result.desc,
					botton: '去升级',
					dialog: true
				}
				this.is_ok = true;
			}).catch(e => {
				console.log(e);
			})
		},
		methods: {
			...my,
			to_sign() {
				let str = '';
				let data = new Date();
				str = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`
				this.$http('post|api/User/sign', {
					str
				}).then(res => {
					this.$toastApp(res.msg);
					setTimeout(() => {
						this.users.is_sign = 1;
					}, 1000)
				})
			},
			permission_change() {
				if (this.botton == '去实名') {
					uni.navigateTo({
						url: '/my/shiming/shiming'
					})
					return
				}
				this.title = '';
				this.message = '';
				this.botton = '';
				uni.navigateTo({
					url: `/index/good_detail/good_detail?id=${this.good_id}`
				});
			},
			conditions_change() {
				this.$http('get|api/User/apply_level').then(res => {
					this.$http('get|api/User/index').then(res => {
						this.users = res.result.users;
					})
					this.$toastApp(res.msg);
					this.conditions = {
						title: '',
						message: '',
						botton: '',
						dialog: false
					}
				}).catch(e => {
					this.$toastApp(e.msg);
					// console.log(e);
				})
			},
			go_login() {
				// #ifdef APP-PLUS
				if (!this.users.nickname) {
					uni.navigateTo({
						url: '/pages/login'
					})
				}
				// #endif
			}
		},
		components: {
			bindAccount,
			noPermission,
			noConditions
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.page {
		background-color: #F7F7F7;
		min-height: calc(100vh - 100rpx);
		padding-bottom: 20rpx;
		box-sizing: border-box;
	}

	.my-user {
		height: 478rpx;
		width: 100%;
		/* #ifndef H5 */
		background-image: url(../static/user_bg.png);
		/* #endif */
		/* #ifdef H5 */
		background-image: url(../static/h5_user_bg.png);
		/* #endif */
		background-size: 100% 100%;
		padding: 0 30rpx;
		padding-top: 90rpx;
		box-sizing: border-box;

		.message {
			position: absolute;
			right: 100rpx;
			top: 30rpx;

			.tip {
				position: absolute;
				height: 36rpx;
				width: 36rpx;
				background-color: #F4293F;
				border-radius: 50%;
				text-align: center;
				line-height: 36rpx;
				color: #ffffff;
				right: -16rpx;
				top: -16rpx;
			}
		}

		.seting-img {
			height: 40rpx;
			width: 40rpx;
		}

		.seting {
			position: absolute;
			right: 30rpx;
			top: 30rpx;
		}

		.user {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.sign {
				height: 90rpx;
				width: 90rpx;
			}

			.user-adv {
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					height: 120rpx;
					width: 120rpx;
					border-radius: 50%;
				}

				>view {
					padding-left: 20rpx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 120rpx;
					color: #ffffff;

					.vip {
						min-width: 120rpx;
						height: 36rpx;
						background: #FFC700;
						border-radius: 20rpx;
						text-align: center;
						line-height: 36rpx;
						margin-left: 20rpx;
						color: var(--theme);
						// vertical-align: bottom;
						padding: 0 10rpx;
					}
				}
			}
		}

		.user-msg {
			margin-top: 50rpx;
			text-align: center;
			display: flex;

			>view {
				flex: 1;
				color: #ffffff;
			}
		}
	}

	.wallet {
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		width: 710rpx;
		margin: 0 auto;
		margin-top: -110rpx;
		background-color: #ffffff;
		position: relative;

		.my-wallet {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 4rpx solid #EDEDED;
			padding-bottom: 20rpx;

			.font-26 {
				color: #B0B0B0;
				padding-right: 34rpx;
				position: relative;
			}

			.font-26::after {
				position: absolute;
				content: '';
				right: 0;
				top: 50%;
				margin-top: -12rpx;
				height: 28rpx;
				width: 28rpx;
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAAB6klEQVRYR+XXTUsbQRgH8P8TsiHF0muhCB56FVYyWQqBHvYgKm3tSQ/6DSR9uQT8Ah6reCitR0++nYI99QOEQGZWQohnD+bSW7OWNLt2nzKwQumhbDbbOOKcB/4/5uWZZwiGDDLEgbsHkVI+JaLn/X7/0HXdn1mvZOIVkVJ+BTAPoGlZ1mvbtr9liUkM8TxvKYqiEwBTAC5yudyLUql0nhUmMUQHttvtUhiGpwCeAPgOYLVcLuuVGnuMBNFpzWZzOp/Pa8wcgGsiqgoh9saVjAzRgd1u9+FgMDgA8DIGbAshakQUpQWlgugwZs4ppbYBvIvD65Zlrdu2/SMNJjXkJkxKuQFgF0AegBcEwXKlUumNihkbogOVUovMfATgEYBLZl52HOdsFEwmkPhGzYZh+AXADBFdAVgTQuhDnWhkBtFpnU7ncRAEdWZ+BuAXM9ccx9lJIskUogMbjcaDYrG4H0XRSgz45Pv+W9d1r/8FyhwS3yhSSm0R0SYzExF9FEJU7ydEb02hUNgHcLM1n33ffzPRrfn7sBJRTQgx2cPaarVmieh2r69SaoGZj+OC1mPmVxMvaH+WeCLyhsPhZEu8fvQ8z/vAzO9v7dEzog0wojEyolU0pnk25jthzAcrSU8xzpz/0gakARkD+Q1UIPIh8sz2ZQAAAABJRU5ErkJggg==);
				background-size: 100%;
			}
		}

		.wallt-msg {
			margin-top: 28rpx;

			.msg-item {
				display: flex;
				height: 100rpx;
				text-align: center;

				>view {
					flex: 1;
				}

				.font-24 {
					color: #B3B3B3;
				}

				.font-30 {
					color: #F75348;
					font-weight: bold;
				}

				.right {
					padding-left: 30rpx;
					box-sizing: border-box;
				}
			}
		}

		.wallt-msg::after {
			position: absolute;
			width: 650rpx;
			height: 2rpx;
			// background: rgba(242, 242, 242, 1);
			transform: scaleY(0.5);
			content: '';
			left: 50%;
			margin-left: -325rpx;
			top: 240rpx;
		}

		// .wallt-msg::before{
		// 	position: absolute;
		// 	width:2rpx;
		// 	height:200rpx;
		// 	background:rgba(242,242,242,1);
		// 	content: '';
		// 	transform: scaleX(0.5);
		// 	left: 50%;
		// 	top: 50%;
		// 	margin-top: -66rpx;
		// }
	}

	.order {
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		width: 710rpx;
		margin: 0 auto;
		background-color: #ffffff;
		/* #ifdef APP-PLUS */
		margin-top: 20rpx;
		/* #endif */
		/* #ifdef H5 */
		margin-top: -100rpx;
		/* #endif */

		.my-order {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 4rpx solid #EDEDED;
			padding-bottom: 20rpx;

			.font-26 {
				color: #B0B0B0;
				padding-right: 34rpx;
				position: relative;
			}

			.font-26::after {
				position: absolute;
				content: '';
				right: 0;
				top: 50%;
				margin-top: -12rpx;
				height: 28rpx;
				width: 28rpx;
				background-image: url(../static/more.png);
				background-size: 100%;
			}
		}

		.order-option {
			display: flex;
			justify-content: space-around;
			text-align: center;
			margin-top: 28rpx;

			>view {
				position: relative;

				.tip {
					position: absolute;
					width: 36rpx;
					height: 36rpx;
					background: rgba(255, 79, 98, 1);
					border-radius: 50%;
					color: #ffffff;
					line-height: 36rpx;
					right: -4rpx;
					top: -13rpx;
				}
			}
		}
	}

	.service {
		padding: 0 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		width: 710rpx;
		margin: 0 auto;
		background-color: #ffffff;
		margin-top: 20rpx;

		.my-service {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 4rpx solid #EDEDED;
			line-height: 90rpx;
		}

		.service-content {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-bottom: 30rpx;
			box-sizing: border-box;

			>view {
				width: 25%;
				display: flex;
				margin-top: 30rpx;
				flex-flow: column;
				align-items: center;
				justify-content: center;
			}

			image {
				height: 60rpx;
				width: 60rpx;
				margin-bottom: 10rpx;
			}

			.font-24 {
				color: #666666;
			}
		}
	}

	.invite {
		image {
			height: 32rpx !important;
			width: 32rpx !important;
			vertical-align: sub;
			margin-left: 10rpx;
		}
	}

	.wallet-small {
		image {
			width: 48rpx;
			height: 48rpx;
		}
		.address-txt{
			width: 230rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
