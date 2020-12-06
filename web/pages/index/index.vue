<template>
	<view class="index-body">
		<!-- 顶部自定义导航栏 -->
		<u-navbar title-color="#fff" :is-fixed="isFixed" :is-back="isBack" :border-bottom="borderBottom" v-if="index !== 4">
			<view class="slot-wrap">
				<text>{{head}}</text>
			</view>
		</u-navbar>
		<view class="content">
			<home v-if="index === 0" />
			<classify v-if="index === 1" />
			<search v-if="index === 2" />
		</view>
		<bookrack v-if="index === 3" />
		<mine v-if="index === 4" />
		<!-- 底部标签栏 -->
		<bottom @toIndex="toIndex"></bottom>

	</view>

</template>

<script>
	import home from '../home/home.vue'
	import classify from '../classify/classify.vue'
	import bookrack from '../bookrack/bookrack.vue'
	import search from '../search/search.vue'
	import mine from '../mine/mine.vue'
	import bottom from '../../components/bottom/bottom.vue'
	export default {
		components: {
			home,
			classify,
			bookrack,
			search,
			mine,
			bottom,
		},
		data() {
			return {
				isBack: false, //是否显示导航栏左边返回图标和辅助文字
				isFixed: true, //固定在顶部
				borderBottom: false, //导航栏底部是否显示下边框
				index: 0,
				head: '首页',
			}
		},
		onLoad() {
		},
		methods: {
			toIndex(index) {
				this.index = index
				if (index == 0) {
					this.head = '首页'
				} else if (index == 1) {
					this.head = '分类'
				} else if (index == 2) {
					this.head = '搜索'
				} else if (index == 3) {
					this.head = '书架'
				} else if (index == 4) {
					this.head = '我的'
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	page{
		height: 100%;
	}
	/*苹果x适配 H5APP*/
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
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		left: 0;
		right: 0;
		bottom: $navHeight;
		overflow-y: auto;
	}

	.slot-wrap {
		font-size: 35upx;
		padding: 0 $bleed;
	}

	.index-body::-webkit-scrollbar {
		display: none !important;
	}

	.content::-webkit-scrollbar {
		display: none !important;
	}

	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.content {
			top: $stairTopTow;
			bottom: $navHeight + $navBoxHeight;
		}

		/* #ifdef H5 */
		.content {
			top: $barHeight;
			bottom: $navHeight;
		}


		/* #endif */
	}

	/*苹果xs适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.content {
			top: $stairTopTow;
			bottom: $navHeight + $navBoxHeight;
		}


		/* #ifdef H5 */
		.content {
			top: $barHeight;
			bottom: $navHeight;
		}


		/* #endif */
	}


	/*苹果xr适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {

		.content {
			top: $stairTopTow;
			bottom: $navHeight + $navBoxHeight;
		}

		/* #ifdef H5 */
		.content {
			top: $barHeight;
			bottom: $navHeight;

		}

		/* #endif */
	}
</style>
