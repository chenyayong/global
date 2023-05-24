<template>
    <view class="pay_method" v-if="dialog" @touchmove.stop.prevent>
        <view class="content">
            <image src="/static/close.png" @tap="close" class="close" />
            <view class="header font-32">选择支付方式</view>
            <!-- <view class="pay-item" @tap="to_over_pay">
				<image src="/static/over.png" class="image-44" mode="" />
				<view class="value">
					<view>余额支付</view>
					<view class="num">{{user_money}}可用</view>
				</view>
			</view> -->
            <view class="pay-item" @tap="integral_pay" v-if="!offline_dialog">
                <image src="/static/over.png" class="image-44" mode="" />
                <view class="value">
                    <view>积分支付</view>
                    <view class="num">{{ pay_points }}可用</view>
                </view>
            </view>
            <view class="pay-item" @tap="offline_pay" v-if="offline_dialog">
                <image src="/static/icon_3.png" class="image-44" mode="" />
                <view class="value">
                    <view>线下支付</view>
                    <view class="num"></view>
                </view>
            </view>
            <view class="pay-item" @tap="paypal_pay" v-if="offline_dialog && price < limitPrice">
                <image src="/static/icon_3.png" class="image-44" mode="" />
                <view class="value">
                    <view>国际支付</view>
                    <view class="num"></view>
                </view>
            </view>
            <!-- #ifdef H5 -->
            <!-- <view class="pay-item" @tap="user_pay" v-if="offline_dialog">
				<image src="/static/wechat.png" class="image-44" mode="" />
				<view class="value">
					<view>微信好友代付</view>
					<view class="num"></view>
				</view>
			</view> -->
            <!-- #endif -->
            <block v-if="price < limitPrice">
                <view class="pay-item" v-for="(item, index) in list" :key="index" @tap="other_pay(item)">
                    <image :src="$image + item.icon" class="image-44" mode="" />
                    <view class="value">
                        <view>{{ item.name }}</view>
                        <view class="num"></view>
                    </view>
                </view>
            </block>
            <!-- <view class="pay-item" @tap="to_replace_pay" v-if="!isFirend">
				<image src="/static/replace_icon.png" class="image-44" mode="" />
				<view class="value">
					<view>找人代付</view>
					<view class="num"></view>
				</view>
			</view> -->
        </view>
        <uni-popup ref="popup">
            <view class="popup">
                <view class="popup-close" @click="close_popup"><image src="/static/close.png" style="width: 30rpx; height: 30rpx;" mode=""></image></view>
                <view class="popup-title">致尊敬的各位合作伙伴!</view>
                <view class="popup-body">
                    <view class="">
                        大家好! 感谢大家对新视界国际平台一直以来的支持，在2023新的一年里, 新视界集团同仁祝您新年平安健康! 由于新视界国际平台的微信支付接口调整,
                        微信在线支付和微信扫码支付的功能将暂停使用。我们将尽快恢复微信支付功能, 请先使用支付宝扫码支付或银行转账等方式付款, 不便之处敬请谅解!
                    </view>
                    <view class="" style="margin-top: 10rpx;font-size: 28rpx;font-weight: bold;color: #000000;">付款方式1: 支付宝扫码支付</view>
                    <view class="" style="padding: 0 170rpx;"><image src="/static/alipay.png" mode="widthFix" style="width: 100%;"></image></view>
                    <view class="" style="margin-top: 10rpx;font-size: 28rpx;font-weight: bold;color: #000000;">付款方式2: 银行转账</view>
                    <view class="">银行名称 : 招商银行深圳分行新时代支行</view>
                    <view class="">开户人 : 深圳快来互娱网络科技有限公司</view>
                    <view class="">银行账号 : 755934880910802</view>
                </view>
                <view class="popup-foot">
                    <view class="">如有疑问请与各运营中心客服联系，感谢您的关注与支持。</view>
                    <view
                        class=""
                        style="margin-top: 10rpx;
                                display: flex;
                                flex-flow: column;
                                align-items: flex-end;"
                    >
                        <view class="">NV新视界APP</view>
                        <view class="">2023年1月6日</view>
                    </view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
export default {
    props: {
        value: {},
        list: {},
        user_money: {},
        pay_points: {
            default: 0
        },
        offline_dialog: {
            default: true
        },
        isFirend: {
            type: Boolean,
            default: false
        },
        price: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            dialog: false,
            limitPrice: 50000
        }
    },
    methods: {
        to_over_pay() {
            this.$emit('over_pay')
            this.dialog = false
        },
        offline_pay() {
            this.$emit('offline_pay')
        },
        other_pay(e) {
            // if (e.code === 'weixin') {
            //     this.$refs.popup.open()
            // } else {
            //     this.$emit('other_pay', e)
            // }
            this.$emit('other_pay', e)
        },
        close() {
            this.dialog = false
            this.$emit('close')
        },
        user_pay() {
            this.dialog = false
            this.$emit('user_pay')
        },
        integral_pay() {
            //    this.dialog=false;
            this.$emit('integral_pay')
        },
        paypal_pay() {
            this.$emit('paypal_pay')
            // this.$toast('暂未开放')
        },
        to_replace_pay() {
            this.dialog = false
            this.$emit('replace_pay')
        },
        close_popup() {
            this.$refs.popup.close()
        }
    },
    watch: {
        value(val) {
            this.dialog = val
            if (val) {
                this.noScroll()
            } else {
                this.remScroll()
            }
        },
        dialog(val) {
            this.$emit('input', val)
        }
    }
}
</script>

<style lang="scss">
.pay_method {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.7);

    .content {
        position: absolute;
        bottom: 0;
        width: 100%;
        animation: toShow 0.3s;
        background-color: #ffffff;

        .close {
            position: absolute;
            right: 30rpx;
            top: 30rpx;
            height: 36rpx;
            width: 36rpx;
        }

        .header {
            padding: 0 30rpx;
            box-sizing: border-box;
            text-align: center;
            line-height: 90rpx;
            border-bottom: 2rpx solid #f4f4f4;
        }

        .pay-item {
            padding: 0 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            height: 120rpx;
            position: relative;

            // border-bottom: 1rpx solid #F4F4F4;
            .value {
                padding-left: 20rpx;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex: 1;
                font-size: 30rpx;

                .num {
                    color: #999999;
                }
            }
        }

        .pay-item::after {
            position: absolute;
            height: 2rpx;
            width: 690rpx;
            background-color: #f4f4f4;
            content: '';
            bottom: 0;
            left: 50%;
            margin-left: -345rpx;
        }
    }
}
.popup {
    background-color: #ffffff;
    font-size: 24rpx;
    padding: 10rpx 20rpx;
    width: 85%;
    border-radius: 8rpx;
    margin: auto;
    display: block;
    color: #666;
    position: relative;
    .popup-close {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
    }
    .popup-title {
        font-size: 28rpx;
        text-align: center;
        color: #000;
        // padding-bottom: 40rpx;
        margin-bottom: 10rpx;
    }
    .popup-list {
        padding: 20rpx 0;
    }
    .popup-label {
        display: flex;
        margin-bottom: 30rpx;
    }
    .tips-area {
        margin-left: 10rpx;
        .tips-area-item {
            margin-bottom: 6rpx;
            white-space: pre-line;
        }
    }
    .popup-warning {
        color: #f73131;
        margin-bottom: 40rpx;
    }
    .popup-foot {
        margin-top: 10rpx;
        // display: flex;
        // justify-content: space-around;
    }
}
</style>
