<template>
	<view class="">
		<view class="juker wallt-msg">
			<view class="msg-item" v-for="(item, index) in jukerData" :key="index">
				<view class="font-24 msg-item-tips" style="width: 96%;display: flex;justify-content: space-between">
					<view class="" :style="{ color: item.status === 2 ? '#000' : '' }">{{ item.phase }}</view>
					<view>订单号： {{ item.order_sn }}</view>
				</view>
				<view class="wallet-small">
					<image src="/static/juker-ticket.png"></image>
					<view class="font-24" :style="{ color: item.status === 2 ? '#000' : '' }">祝播券</view>
					<view class="font-24" :style="{ color: item.status === 2 ? '#000' : '' }">{{ item.give_sum }}</view>
				</view>
				<view class="wallet-small" v-if="item.valid_month != 0">
					<picker :disabled="item.status === 2" :value="bonusIndexs[index]"
						@change="bindTimerChange($event, index)" range-key="pick_time" :range="bonusList[index]">
						<image src="/static/juker-timer.png"></image>
						<view class="font-24">分红时间</view>
						<view class="font-24" v-if="item.status === 1">设置开始时间</view>
						<view class="font-24" v-if="item.status === 2" style="text-align: left;">
							<view>{{ item.start_time }} -</view>
							<view>{{ item.end_time }}</view>
						</view>
					</picker>
				</view>
				<view class="wallet-small" v-if="item.valid_month != 0">
					<image src="/static/juker-date.png"></image>
					<view class="font-24">分红周期(月)</view>
					<view class="font-24">{{ item.valid_month + item.free_month }}个月</view>
				</view>
				<view class="wallet-small" v-if="item.valid_month != 0">
					<image src="/static/juker-money.png"></image>
					<view class="font-24">分红总额</view>
					<!-- <view class="font-24">¥0</view>
                    <view class="font-24" style="font-size: 20rpx;">(分红总额高于¥{{ item.goods_price }})</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jukerData: [],
				bonusIndexs: [],
				bonusList: []
			}
		},
		methods: {
			juker_list() {
				this.$http('get|api/user/juker_list')
					.then(res => {
						this.jukerData = res.result
						console.log('get|api/user/juker_list', this.jukerData)
						// this.jukerData = [{give_sum: 120000}, {give_sum: 90000}, {give_sum: 12000}]
						if (this.jukerData && this.jukerData.length) {
							this.bonusList = this.getBonusList(this.jukerData)
							this.bonusIndexs = this.bonusList.slice().fill(0)
						}
					})
					.catch(res => {
						// console.log('juker_list catch', res)
					})
			},
			bindTimerChange(item, index) {
				this.bonusIndexs[index] = item.detail.value
				// const data = this.jukerData[index]
				const data2 = this.bonusList[index][this.bonusIndexs[index]]
				// console.log('bindTimerChange', data, data2)
				const now = Date.now()
				const time = Date.parse(data2.end_time.replace(/-/g, '/'))
				if (now > time) {
					uni.showToast({
						title: '过期时间不可以选择',
						icon: 'none'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '请注意确认后不能再提交了',
						success: res => {
							if (res.confirm) {
								const data = this.jukerData[index]
								const data2 = this.bonusList[index][this.bonusIndexs[index]]
								// console.log('提示', data2)
								this.check_time(data, data2)
								// console.log('用户点击确定');
							} else if (res.cancel) {
								// console.log('用户点击取消')
							}
						}
					})
				}
			},
			check_time(data, data2) {
				this.$http('post|api/user/check_time', {
						log_id: data.log_id,
						start_time: data2.start_time,
						end_time: data2.end_time
					})
					.then(res => {
						// console.log('check_time', res)
						this.juker_list()
					})
					.catch(res => {
						// console.log('check_time catch', res)
					})
			},
			getBonusList(data) {
				const result = []
				data.forEach((item, index) => {
					// const add_time = item.add_time
					result[index] = this.getBonusItem(item)
				})
				// console.log('getBonusList', result)
				return result
			},
			// getBonusItem(time) {
			//     const splitTime = time.split('-')
			//     const year = parseInt(splitTime[0])
			//     const month = parseInt(splitTime[1])
			//     // const month = 6;
			//     const date = parseInt(splitTime[2])
			//     // const date = 18;
			//     const result = []
			//     for (let i = 0; i < 12; i++) {
			//         const temp = {
			//             start_time: '',
			//             end_time: '',
			//             pick_time: ''
			//         }

			//         if (month < 4 || (month === 4 && date <= 15)) {
			//             let tempMonth = 5 + i
			//             let tempMonth2 = 5 + i + 1
			//             let tempYear = year
			//             let tempYear2 = year
			//             if (tempMonth > 12) {
			//                 tempMonth = tempMonth - 12
			//                 tempYear = tempYear + 1
			//             }
			//             if (tempMonth2 > 12) {
			//                 tempMonth2 = tempMonth2 - 12
			//                 tempYear2 = tempYear2 + 1
			//             }
			//             temp.start_time = `${tempYear}-${tempMonth}-${16}`
			//             temp.end_time = `${tempYear2}-${tempMonth2}-${15}`
			//             temp.pick_time = `${temp.start_time} - ${temp.end_time}`
			//         } else {
			//             let tempMonth = month + i + 2
			//             let tempMonth2 = month + i + 3
			//             let tempYear = year
			//             let tempYear2 = year
			//             if (tempMonth > 12) {
			//                 tempMonth = tempMonth - 12
			//                 tempYear = tempYear + 1
			//             }
			//             if (tempMonth2 > 12) {
			//                 tempMonth2 = tempMonth2 - 12
			//                 tempYear2 = tempYear2 + 1
			//             }
			//             temp.start_time = `${tempYear}-${tempMonth}-${16}`
			//             temp.end_time = `${tempYear2}-${tempMonth2}-${15}`
			//             temp.pick_time = `${temp.start_time} - ${temp.end_time}`
			//         }
			//         result[result.length] = temp
			//     }
			//     return result
			// },
			getBonusItem(juker) {
				// const splitTime = juker.add_time.split('-').map(x => parseInt(x))
				// const [year, month, date] = splitTime
				const currentDate = new Date()
				const year = currentDate.getFullYear()
				const month = currentDate.getMonth() + 1
				const date = currentDate.getDate()
				const result = []
				let i = 0
				let length = 12
				// let jukerTime = Date.parse(juker.add_time.replace(/-/g, '/'))
				// let time = Date.parse('2023/3/16')
				// if (jukerTime < time) {
				//     length = 24
				// }
				for (i = 0; i < length; i++) {
					const temp = {
						start_time: '',
						end_time: '',
						pick_time: ''
					}
					let start_month = 0
					let end_month = 0
					if (date > 15) {
						start_month = month + i + 1
					} else {
						start_month = month + i
					}
					end_month = start_month + juker.valid_month + juker.free_month

					let start_year = year
					let end_year = year

					if (start_month > 12) {
						start_year = year + Math.floor(start_month / 12)
						start_month = start_month % 12 || 12
					}

					if (end_month > 12) {
						end_year = year + Math.floor(end_month / 12)
						end_month = end_month % 12 || 12
					}
					temp.start_time = `${start_year}-${start_month}-${16}`
					temp.end_time = `${end_year}-${end_month}-${15}`
					temp.pick_time = `${temp.start_time} - ${temp.end_time}`
					result[result.length] = temp
				}
				return result
			}
		},
		onLoad() {
			this.juker_list()
		}
	}
</script>

<style lang="scss">
	page {
		padding: 20rpx;
	}

	.juker {
		.msg-item {
			padding-bottom: 20rpx;
			margin-bottom: 50rpx;
		}

		.msg-item:last-child {
			margin-bottom: 0;
		}
	}

	.wallt-msg {
		margin-top: 50rpx;

		.msg-item {
			display: flex;
			// height: 100rpx;
			// text-align: center;
			// margin-bottom: 50rpx;
			position: relative;

			.msg-item-tips {
				position: absolute;
				top: -40rpx;
			}

			>view {
				flex: 1;
			}

			.font-24 {
				color: #b3b3b3;
			}

			.font-30 {
				color: #f75348;
				font-weight: bold;
			}

			.right {
				padding-left: 30rpx;
				box-sizing: border-box;
			}

			&:not(:last-child)::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				background-color: #eee;
				transform: scaleY(0.5);
				height: 1px;
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

	.wallet-small {
		text-align: center;
		max-width: 25%;

		image {
			width: 48rpx;
			height: 48rpx;
		}

		.address-txt {
			width: 230rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
