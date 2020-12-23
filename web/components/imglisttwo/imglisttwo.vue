<template>
	<view>
		<view class="image-list" v-for="(imgdata,imgdataKey) in imglisttwo" :key="imgdataKey">
			<!-- 标题 -->
			<view class="image-head">
				<p>
					{{imgdata.head}}
					<span>
						查看更多
						<i class="iconfont right" />
					</span>
				</p>
			</view>
			<!-- 图文列表 -->
			<view class="books" v-for="(information,dataKey) in imgdata.data" :key="dataKey" @click="imageTextBtn(information._id)">
				<view class="books-img">
					<image :src="url[Math.floor((Math.random()*url.length))]" />
				</view>
				<view class="books-text">
					<p class="head">{{information.title}}</p>
					<view class="title-box">
						<p class="title">{{ information.author}}</p>
						<!-- <p class="title text-right">￥{{information.price}}</p> -->
					</view>
					<view class="title-bottom">
						<p class="title">{{information.keyWord}}</p>
						<!-- <p class="title text-right ">原价：￥{{information.initialize}}</p> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: ['imglisttwo'],
		data() {
			return {
				url: [
					"https://s1.ax1x.com/2020/08/12/ajXteS.png",
					"https://s1.ax1x.com/2020/08/12/ajjt6x.png",
					"https://s1.ax1x.com/2020/08/12/ajjfHS.png",
					"https://s1.ax1x.com/2020/08/12/ajjHcq.png",
					"https://s1.ax1x.com/2020/05/25/tpsFDH.png",
					"https://s1.ax1x.com/2020/08/12/ajvsVU.png",
					"https://s1.ax1x.com/2020/08/12/ajvTaD.png",
					"https://s1.ax1x.com/2020/08/12/ajjt6x.png",
					"https://s1.ax1x.com/2020/08/12/ajzdBV.png",
					"https://s1.ax1x.com/2020/08/12/avSLRJ.png",
					'https://s2.ax1x.com/2020/03/05/3THGsU.png',
					'https://s2.ax1x.com/2020/03/04/35f6C4.png',
					'https://s2.ax1x.com/2020/03/04/35fs5F.png',
					'https://s2.ax1x.com/2020/03/04/35fhb6.png',
					'https://s2.ax1x.com/2020/03/05/3T5pLj.png',
					'https://s2.ax1x.com/2020/03/05/3T5Ces.png',
					'https://s2.ax1x.com/2020/03/05/3T5Pwn.png',
					'https://s2.ax1x.com/2020/03/05/3TH8MT.png'
				],
			}
		},
		methods: {
			imageTextBtn(imageTextBtn) {
			 	console.log('你点击了第' + imageTextBtn + '个')
				uni.navigateTo({
					url: `../../pages/booksInfo/booksInfo?id=${imageTextBtn}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.image-list {
		padding: 0 $bleed;
	}

	.image-head {
		line-height: 120upx;
		height: 120upx;

	}

	.image-head p {
		font-size: 38upx;
	}

	.image-head span,
	.image-head span i {
		float: right;
		color: $mediumGrey;
		font-size: 26upx;
	}

	.image-head span .iconfont {
		font-size: 20upx;
	}

	.books {
		display: flex;
		margin-bottom: 30upx;
	}

	.books-img image {
		width: 160upx;
		height: 212upx;
		background-color: $skeletonColor;
		border-radius: 8upx;
	}

	.books-text {
		height: 212upx;
		padding: 16upx 0 16upx 20upx;
		box-sizing: border-box;
	}

	.books-text .head {
		font-size: 30upx;
		height: 40upx;
		line-height: 40upx;
	}

	.title {
		font-size: 26upx;
		color: $mediumGrey;
	}

	.title-box {
		display: flex;
		height: 104upx;
		line-height: 104upx;
	}

	.title-box .title {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.title-box .text-right {
		text-align: right;
		font-size: 36upx;
		color: $redAll;
	}

	.title-bottom {
		height: 36upx;
		line-height: 36upx;
		display: flex;
	}

	.title-bottom .title {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.title-bottom .text-right {
		text-align: right;
		max-width: 160upx;
		text-decoration: line-through
	}
</style>
