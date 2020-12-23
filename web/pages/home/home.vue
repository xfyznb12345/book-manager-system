<template>
	<view class="">
		<!-- 轮播图 -->
		<banner />

		<!-- 金刚区 -->
		<view class="function">
			<view class="select" v-for="(selectDatas,selectKey) in selectData" :key="selectKey">
				<view @click="selectBtn(selectKey)">
					<view class="select-img" :class="{}">
						<image :src="selectDatas.url"></image>
					</view>
					<text>{{selectDatas.text}}</text>
				</view>
			</view>
		</view>
		<!-- 未登录状态 -->
		<!-- 热门好书图文列表 -->
		<imgListTwo :imglisttwo="fineList" v-if="!hasLogin"/>
		<!-- 登录状态-->
		<!-- 热门好书图文列表 -->
		<imgList :imageList="imageLists"  v-if="hasLogin"/>
		<!-- 推荐图文列表 -->
		<imgListTwo :imglisttwo="likeList" v-if="hasLogin" />


	</view>
</template>

<script>
	import imgList from '../../components/imglist/imglist.vue'
	import imgListTwo from '../../components/imglisttwo/imglisttwo.vue'
	import banner from '../../components/banner/banner.vue'

	export default {
		components: {
			imgList,
			imgListTwo,
			banner,
		},
		data() {
			return {
				hasLogin:false,
				selectData: [{
						url: "../../static/p1.png",
						text: "热门书榜"
					},
					{
						url: "../../static/p2.png",
						text: "新书上架"
					},
					{
						url: "../../static/p3.png",
						text: "精选书籍"
					},
					{
						url: "../../static/p4.png",
						text: "最多收藏"
					},
				],
				fineList:[{
					head:'热门好书',
					data:[]
				}],
				imageLists: [{
					head: '精品好书',
					imgdata: [{
						data: []
					}]
				}],
				likeList: [{
					head: '推荐',
					data: []
				}]
			}
		},
		methods: {
			async getFineBook() { //未登录的时候
				const res = await this.$api.fineBook()
				if (res) {
					this.fineList[0].data = res
				}
			},
			async getBookList(){ //登录状态下
				const res1 = await this.$api.fineBook() 
				const res2 = await this.$api.recommend() 
				if (res1 && res2) {
					this.imageLists[0].imgdata[0].data = res1
					this.likeList[0].data = res2
				}
			},
			selectBtn(selectKey) {
				// 金刚区按钮 
				uni.showToast({
					icon: 'none',
					title: '功能未开发，请先充值'
				})
				// console.log('你点了第' + selectKey + '个选项')
				// uni.navigateTo({
				// 	url: '../../pages/rankingList/rankingList'
				// })
			},
			checkLogin() { //检查登录
				try {
					const value = uni.getStorageSync('user_token');
					if (value) {
						this.hasLogin = true
						this.getBookList()
					} else {
						this.hasLogin = false
						this.getFineBook()
					}
				} catch (e) {
					// error
				}
			}
		},
		created() {
			this.checkLogin()
		}
	}
</script>

<style scoped lang="scss">
	.banner {
		padding: 40upx $bleed 0upx $bleed;
		box-sizing: border-box;
	}

	.banner image {
		width: 100%;
	}

	.function {
		padding: 70upx 0 40upx 0;
		display: flex;
	}

	.select {
		flex: 1;
		width: 100%;
		text-align: center;
	}

	.select-img {
		padding: 0 0 4upx 0;
	}

	.select-img image {
		height: 66upx;
		width: 66upx;
	}

	.select text {
		font-size: 26upx;
		line-height: 26upx;
	}
</style>
