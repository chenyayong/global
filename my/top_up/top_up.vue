<template>
    <view>
        <view class="box" v-if="list.length > 0">
            <view class="list-item" v-for="(item, index) in list" :key="index">
                <view class="flex">
                    <view class="font-30">提现</view>
                    <view class="font-36" :style="{ color: item.status > 0 ? '#989898' : '#FF4C57' }">{{ item.money }}</view>
                </view>
                <view class="flex font-26">
                    <view>{{ item.create_time }}</view>
                    <view>{{ item.status_deac }}</view>
                </view>
                <view class="flex" v-if="is_tax(item)" style="margin-top: 20rpx;">
                    <view class="font-26">缴税凭证</view>
                    <view>
                        <text v-if="item.tax_path" class="font-26">已提交</text>
                        <label v-else @click="submit(index)">
                            <lsj-upload
                                ref="lsjUpload"
                                childId="upload"
                                :width="height"
                                :height="height"
                                :option="option"
                                :size="size"
                                :debug="debug"
                                :instantly="instantly"
                                :index="index"
                                @progress="onprogress"
                                @change="onChange"
                            >
                                <view class="btn" :style="{ height: height }">选择附件</view>
                            </lsj-upload>
                        </label>

                        <!-- <image v-if="item.tax_path" @click="previewImage(item)" class="tax_path" :src="$image + item.tax_path" mode=""></image> -->
                        <!-- <view v-else class="btn" :id="'tax_path' + index" @click="submit(item, index)">选择附件</view> -->
                        <!-- <image class="tax_path" src="https://mdn.alipayobjects.com/gov_gjj/afts/file/A*y5KwTrJHI9YAAAAAAAAAAAAADX11AA?t=WG48CZfUZu29Qq0bhab89wAAAABkdX1ipZuC" mode=""></image> -->
                        <!-- <image v-if="item.tax_path" @click="previewImage(item)" class="tax_path" :src="$image + item.tax_path" mode=""></image>
                        <image class="tax_path" @click="chooseImage(item, index)" v-else src="/static/add_img.png" mode=""></image> -->
                    </view>
                </view>
            </view>
        </view>
        <view v-else><no-data></no-data></view>
        <!-- <no-more v-model="have" v-if="list.length>0" @more="more"></no-more> -->
        <view v-if="list.length > 0"><view v-if="!have" class="no-more">我是有底线的</view></view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            have: true,
            page: 1,
            option: {},
            height: '180rpx',
            size: 10,
            debug: true,
            // 选择文件后是否立即自动上传
            instantly: true,
            files: new Map(),
            position: { left: '0', top: '0' },
            uploadIndex: 0
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    mounted() {
        this.get_list()
    },
    methods: {
        submit(index) {
            this.uploadIndex = index
            console.log('submit', index)
        },
        // 上传进度回调
        onprogress(item) {
            // 更新当前状态变化的文件
            this.files.set(item.name, item)

            // 演示上传完成后取服务端数据
            if (item['responseText']) {
                console.log('演示服务器返回的字符串JSON转对象', JSON.parse(item.responseText))
                this.files.get(item.name).responseText = JSON.parse(item.responseText)
            }

            // 演示判断是否所有文件均已上传成功
            let isAll = [...this.files.values()].find(item => item.type !== 'success')
            if (!isAll) {
                console.log('已全部上传完毕')
                const res = item.responseText
                if (res.status === 1 && res.result) {
                    this.up_tax_path(res, this.uploadIndex)
                    // this.list[this.uploadIndex].tax_path = res.result
                } else {
                    uni.showToast({
                        title: res.msg
                    })
                }
            } else {
                console.log(isAll.name + '待上传')
            }
        },
        // 文件选择回调
        onChange(files, index) {
            this.files = files
            this.uploadIndex = index
        },
        up_tax_path(res, index) {
            const item = this.list[index]
            uni.showLoading({
                mask: true,
                title: '上传中'
            })
            this.$http('post|api/User/up_tax_path', {
                id: item.id,
                tax_path: res.result
            })
                .then(ret => {
                    if (ret.status === 1) {
                        item.tax_path = res.result
                    }
                    uni.showToast({
                        title: ret.msg
                    })
                })
                .finally(() => {
                    uni.hideLoading()
                })
        },
        chooseImage(item, index) {
            uni.chooseImage({
                count: 1,
                sizeType: 'compressed',
                success: chooseImageRes => {
                    uni.showLoading({
                        mask: true,
                        title: '上传中'
                    })
                    this.$uploadCom(chooseImageRes).then(res => {
                        // that.formData.bank_license = res.result
                        this.$http('post|api/User/up_tax_path', {
                            id: item.id,
                            tax_path: res.result
                        })
                            .then(ret => {
                                // console.log('post|api/User/up_tax_path', ret)
                                if (ret.status === 1) {
                                    this.list[index].tax_path = res.result
                                }
                                uni.showToast({
                                    title: ret.msg
                                })
                            })
                            .finally(() => {
                                uni.hideLoading()
                            })
                    })
                }
            })
        },
        previewImage(item) {
            const url = this.$image + item.tax_path
            uni.previewImage({
                current: url,
                urls: [url]
            })
        },
        is_tax(item) {
            const user = this.user
            return user.is_tax === 1 && item.users_type === 2 && item.money_type > 1
        },
        get_list() {
            this.$http('post|api/User/withdrawals_list', {
                p: this.page
            })
                .then(res => {
                    if (res.result.length === 0) {
                        this.have = false
                    } else {
                        this.list = [...this.list, ...res.result]
                    }
                })
                .catch(err => {
                    console.log('post|api/User/withdrawals_list err', err)
                })
        },
        more() {
            this.page += 1
            this.get_list()
        }
    },
    onReachBottom() {
        uni.showLoading({
            title: '加载中...'
        })
        this.more()
    },
    onReady() {
        // 初始化参数
        this.option = {
            url: '/api/Api/add_company_certificate',
            // url: 'https://test.global3plus.com/api/Api/add_company_certificat',
            name: 'company'
        }
    }
}
</script>

<style lang="scss">
page {
    background: #f7f7f7;
}
.btn {
    width: 180rpx;
    height: 180rpx;
    background-color: #ddd;
    color: #fff;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    overflow: hidden;
}
.box {
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    .list-item {
        box-shadow: 0 0 2rpx 0 #ebebeb;
        padding: 30rpx 0;
        .tax_path {
            width: 180rpx;
            height: 180rpx;
            display: block;
        }
        .flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .font-26 {
            color: #999999;
        }
    }
}
.no-more {
    color: #999999;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 26rpx;
    background-color: #f7f7f7;
}
</style>
