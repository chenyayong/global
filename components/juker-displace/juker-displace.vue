<template>
    <uni-popup ref="popup" background-color="#fff" type="center">
        <uni-popup-dialog :before-close="true" type="success" cancelText="拒绝" confirmText="同意" title="祝播客分红置换方案" @confirm="dialogConfirm" @close="dialogClose">
            <checkbox-group class="checkbox-group" @change="change">
                <view class="checkbox-item dflex" v-for="(item, index) in jukerData" :key="index">
                    <view class="flex-1">
                        <view class="">
                            订单编号：{{item.order_sn}}
                        </view>
                        <view class="">
                            订单金额：¥{{item.goods_price}}
                        </view>
                        <view class="">
                            购买时间：{{item.add_time}}
                        </view>
                        <view class="">
                            置换：{{item.valid_month + item.free_month}}个月分红可置换{{item.stock_sum}}股
                        </view>
                    </view>
                    <view class="">
                        <checkbox :value="item.log_id" color="#77c25a" />
                    </view>
                </view>
            </checkbox-group>
        </uni-popup-dialog>
    </uni-popup>
</template>

<script>
    export default {
        name: "juker-displace",
        data() {
            return {
                jukerIds: '',
                jukerData: []
            };
        },
        methods: {
            displaceExpire() {
                const expire = parseInt(uni.getStorageSync('juker_displace_expire'))
                const distance = 1 * 60 * 1000
                const timestamp = Date.now()
                console.log(timestamp, expire, distance, timestamp - expire)
                let result = false
                if (!expire) {
                    result = true
                } else if (timestamp - expire >= distance) {
                    result = true
                }
                return result
            },
            show() {
                this.$http('get|api/user/changeJukerList').then((res) => {
                    const jukerData = res.result || []
                    this.jukerData = jukerData.filter(x => x.is_change === 0)
                    // console.log('this.jukerData', this.jukerData)
                    if (this.jukerData && this.jukerData.length) {
                        const displaceExpire = this.displaceExpire()
                        if (displaceExpire) {
                            this.dialogOpen()
                        }
                    }
                })
            },
            change(e) {
                const value = e.detail.value.join(',')
                this.jukerIds = value
            },
            dialogConfirm() {
                if (this.jukerIds) {
                    this.$refs.popup.close()
                    uni.showModal({
                        content: '您确定要置换该方案吗?',
                        success: (res) => {
                            if (res.confirm) {
                                this.$http('post|api/user/changeJuker', {
                                    log_id: this.jukerIds
                                }).then((res) => {
                                    this.dialogClose()
                                    uni.showToast({
                                        icon: 'none',
                                        title: res.msg
                                    })
                                }).catch((res) => {
                                    this.dialogClose()
                                    uni.showToast({
                                        icon: 'none',
                                        title: res.msg
                                    })
                                })
                            }
                        }
                    })
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '请选择置换的方案'
                    })
                }

            },
            dialogOpen() {
                this.$refs.popup.open()
            },
            dialogClose() {
                this.$refs.popup.close()
                this.jukerIds = ''
                uni.setStorageSync('juker_displace_expire', Date.now())
            }
        }
    }
</script>

<style lang="scss" scoped>
    .checkbox-group {
        font-size: 24rpx;
        color: #999;
        max-height: 50vh;
        overflow-y: scroll;
        width: 100%;
        border: 1px #eee solid;
        padding: 20rpx;

        .checkbox-item {
            margin-bottom: 20rpx;
            display: flex;
            align-items: center;

            checkbox {
                scale: 0.8;
            }
        }
    }

    .dflex {
        display: flex;
    }

    .flex-1 {
        flex: 1;
    }
</style>