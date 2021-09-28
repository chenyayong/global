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
			// console.log(this.$image + '/mobile/index/checkout');
			this.url = this.$image + '/mobile/index/checkout?id=' + opt.id
		}
	}
</script>

<style lang="scss">
	
</style>
