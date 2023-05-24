<template>
    <view>
        <video style="width: 100%;" id="myVideo" :src="src" autoplay controls></video>
    </view>
</template>

<script>
    export default {
        name: "video",
        data() {
            return {
                src: ''
            };
        },
        onLoad(options) {
            this.src  = options.src
        }
    }
</script>

<style lang="scss">

</style>
