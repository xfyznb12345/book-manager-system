<template>
	<view class="banner-box">
		<view class="wrap">
			<u-swiper class="banner-bg" :duration="1000" :height="300" :interval="4000" :list="banner"></u-swiper>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				banner: []
			}
		},
		methods: {
			async getAdList() {
				const res = await this.$api.adList()
				if (res) {
					res.forEach(val => {
						val.image = this.$api.imgUrl + val.image
					})
					this.banner = res
				}
			}
		},
		created() {
			this.getAdList()
		}
	}
</script>

<style scoped lang="scss">
	$bannerH: 300rpx;

	.banner-box {
		padding: 40upx $bleed 0 $bleed;
	}

	.wrap {
		height: $bannerH;
		background-color: $skeletonColor;
	}

	.banner-bg {
		background-color: $skeletonColor;
	}
</style>
