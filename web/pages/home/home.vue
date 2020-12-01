<template>
	<view class="">
			<!-- banner -->
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

			<!-- 推荐图文列表 -->
			<imgList :imageList="imageLists" />

			<!-- 文学图文列表 -->
			<imgList :imageList="listenList" />

			<!-- 精品好书图文列表 -->
			<imgListTwo :imglisttwo="likeList" />


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
				selectData: [{
						url: "https://s2.ax1x.com/2020/02/23/3lVgTP.png",
						text: "榜单"
					},
					{
						url: "https://s2.ax1x.com/2020/02/23/3lVRFf.png",
						text: "小说"
					},
					{
						url: "https://s1.ax1x.com/2020/05/21/YHog4f.png",
						text: "听书"
					},
					{
						url: "https://s2.ax1x.com/2020/02/23/3lV6eI.png",
						text: "精选"
					},
					{
						url: "https://s2.ax1x.com/2020/02/23/3lVsOA.png",
						text: "免费"
					},
				],
				imageLists: [{
					head: '推荐',
					imgdata: [{
						data: [{
								url: "https://s2.ax1x.com/2020/03/04/35f6C4.png",
								title: "我是个妈妈，我需要铂金包",
								author: "温妮斯蒂·马丁"
							},
							{
								url: "https://s2.ax1x.com/2020/03/04/35fhb6.png",
								title: "迷人的材料",
								author: "马克·米奥多尼克"
							},
							{
								url: "https://s2.ax1x.com/2020/03/04/35fs5F.png",
								title: "恋爱口语:我们到底要跟男人聊什么？",
								author: "刘慈欣"
							},
						],

					}, ],
				}, ],
				listenList: [{
					head: '文学',
					imgdata: [{
						data: [{
								url: "https://s2.ax1x.com/2020/03/05/3T5pLj.png",
								title: "你在怕什么：与死亡有关的六幅画",
								author: "陈诺"
							},
							{
								url: "https://s2.ax1x.com/2020/03/05/3T5Ces.png",
								title: "切尔诺贝利的祭祷",
								author: "S.A.阿列克谢耶维奇"
							},
							{
								url: "https://s2.ax1x.com/2020/03/05/3T5Pwn.png",
								title: "流浪地球",
								author: "刘慈欣"
							},

						],

					}, ],
				}, ],
				likeList: [{
					head: '精品好书',
					data: [{
							url: "https://s2.ax1x.com/2020/03/05/3THGsU.png",
							head: "高情商沟通力",
							author: "张超",
							price: "20",
							title: "人是感性的动物，只会偶尔的理性，人与人沟通不是为了找一个答案，而是想要多一份理解和认同。",
							initialize: "30"
						},
						{
							url: "https://s2.ax1x.com/2020/03/05/3TH8MT.png",
							head: "危险的维纳斯",
							author: "东野圭吾",
							price: "10",
							title: "维纳斯」不是某个人，而是存在于我们每个人心中令人疯狂的东西。",
							initialize: "30"
						},
					]
				}, ]
			}
		},
		onLoad() {
			
		},
		methods: {
			selectBtn(selectKey) {
				// 金刚区按钮 
				console.log('你点了第' + selectKey + '个选项')
				uni.navigateTo({
					url: '../../pages/rankingList/rankingList'
				})
			},
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
