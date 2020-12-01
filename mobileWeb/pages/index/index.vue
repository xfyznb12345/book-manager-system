<template>
	<view class="index-body">
		<view class="content">
			
		</view>
		<mine v-if="index === 4" />
		<!-- 底部导航栏 -->
		<bottom @toIndex="toIndex"></bottom>
	</view>
</template>

<script>
	import mine from '../mine/mine.vue'
	import bottom from '@/components/bottom.vue'
	export default {
		components: {
			bottom,
			mine
		},
		data() {
			return {
				index: 0
			}
		},
		onLoad() {

		},
		methods: {
			toIndex(index) {
				this.index = index
			}
		}
	}
</script>

<style scoped lang="scss">
	.index-body {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.content {
		position: fixed;
		top: $stairTop;
		left: 0;
		right: 0;
		bottom: $navHeight;
		overflow-y: auto;
	}
</style>
