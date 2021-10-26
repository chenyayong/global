<template>
	<view>
		<web-view :src="url"></web-view>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				url:''
			};
		},
		onLoad(opt) {
			console.log('PayPal onLoad', this.url);
			this.url = this.$image + '/mobile/index/pay_button?order_id=' + opt.order_id
		}
	}
</script>

<style lang="scss">
	
</style>
