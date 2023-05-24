<script>
export default {
    onLaunch: function() {
        // console.log('App Launch', plus.push.getClientInfo())
        this.plusPushAddEventListener()
        // #ifdef APP-PLUS
        // var info = plus.push.getClientInfo();
        /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送 */
        plus.push.addEventListener(
            'click',
            function(msg) {
                // console.log("click:"+JSON.stringify(msg));
                //    console.log(msg);
                // let payload = JSON.parse(msg.payload)
            },
            false
        )
        // 监听接收透传消息事件
        plus.push.addEventListener(
            'receive',
            function(msg) {
                // 处理透传消息的业务逻辑代码
                // console.log('透传消息：' + JSON.stringify(msg));
                if (msg.type === 'receive') {
                    let payload = JSON.stringify(msg.payload)
                    plus.push.createMessage(msg.content, payload, {
                        title: msg.title
                    })
                }
            },
            false
        )
        // #endif
    },
    methods: {
        plusPushAddEventListener() {
            // #ifdef APP-PLUS
            const _self = this
            const _handlePush = function(message) {
                /**
                 * 通过 vuex 来同步页面的数据，仅做演示。
                 * 实际开发中，这里可能是跳转到某个页面等操作，请根据自身业务需求编写。
                 */

                _self.updatePushMessage(message)
            }
            plus.push.addEventListener('click', function(message) {
                plus.nativeUI.toast('push click')
                _handlePush(message)
            })
            plus.push.addEventListener('receive', function(message) {
                plus.nativeUI.toast('push receive')
                _handlePush(message)
            })
            // #endif
        },
        updatePushMessage(message) {
            /**
             * 注意：这里为了方便预览查看效果，始终对 payload 做了序列化的处理。
             * 实际开发期中，请自行调整代码并注意发送的 payload 消息格式。
             */

            let payload = message.payload
            if (typeof payload !== 'string') {
                message.payload = JSON.stringify(payload)
            }
            // state.pushMessage = message || {}
        }
    },

    onShow: function() {
        // console.log('App Show')
    },
    onHide: function() {
        // console.log('App Hide')
    }
}
</script>

<style lang="scss">
@import '/globe/index.scss';

/* #ifdef APP-PLUS */
page {
    --theme: #4e6ef3;
}
/* #endif */
/* #ifdef H5 */
page {
    --theme: #00be5f;
}
/* #endif */

.ios-btm {
    height: 20rpx;
    height: constant(safe-area-inset-bottom);
    /* 兼容 iOS < 11.2 */
    height: env(safe-area-inset-bottom);
    /* 兼容 iOS >= 11.2 */
}
</style>
