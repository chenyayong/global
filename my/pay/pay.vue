<template>
    <view class="pay">
        <view class="pay-title">深圳快来互娱网络科技有限公司</view>
        <view class="pay-content">
            <view class="input-tips">转账金额</view>
            <view class="input">
                <text style="margin-right: 20rpx;color: #999;">¥</text>
                <input type="number" v-model="money" placeholder="请输入转账金额" />
            </view>
        </view>
        <view class="pay-container"><view @click="pay" class="pay-btn">立即支付</view></view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            money: ''
        }
    },
    methods: {
        pay() {
            if (!this.money) {
                uni.showToast({
                    title: '请输入金额'
                })
                return
            }
            let money = Number(this.money) || 0
            money = Number(money.toFixed(2))
            uni.showLoading({
                mask: true
            })

            this.$http('get|api/join_scan_pay/pay', {
                order_amount: money
            })
                .then(res => {
                    // console.log(res)
                    if (res.status === 1) {
                        // uni.redirectTo({
                        //     url: '../../pages/paypal?order_id=' + res.result.order_id
                        // })
                        window.location.href = res.result.openlink
                    } else {
                        uni.showToast({
                            title: res.msg || '支付失败',
                            icon: 'none'
                        })
                    }
                })
                .finally(() => {
                    uni.hideLoading()
                })
        }
    }
}
</script>

<style scoped lang="scss">
page {
    background-color: #f5f5f5;
}
.pay-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60rpx;
    font-size: 36rpx;
    color: #333333;
}
.pay-content {
    background-color: #ffffff;
    padding: 20rpx;
    .input-tips {
        font-size: 32rpx;
        color: #333333;
        margin-bottom: 20rpx;
    }
    .input {
        display: flex;
        align-items: center;
    }
}
.pay-container {
    padding: 60rpx 20rpx;
    .pay-btn {
        background-color: #dd524d;
        border-radius: 8rpx;
        color: #ffffff;
        font-size: 32rpx;
        display: flex;
        justify-content: center;
        padding: 12rpx 0;
    }
}
</style>
