<template>
    <view><web-view :src="src"></web-view></view>
</template>

<script>
export default {
    data() {
        return {
            url: ''
        }
    },
    onLoad(opt) {
        this.src = opt.src
        // console.log('PayPal onLoad', this.url)
    }
}
</script>

<style lang="scss"></style>