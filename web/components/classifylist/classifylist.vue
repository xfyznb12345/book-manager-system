<template>
	<view class="books-body">
		<!-- 左边切换 -->
		<view class="books-left">
			<view class="left-list" :class="{'books-left-active': listActive == bookDataKey}" v-for="(bookDataList,bookDataKey) in bookData"
			 @click="listBtnOne(bookDataKey,bookDataList.code)" :key="bookDataKey">
				<view class="vertical-bar"></view>
				{{bookDataList.list}}
			</view>
		</view>
		<!-- 筛选弹出层 -->
		<view class="books-right" v-for="(bookDataList,bookDataKey) in bookData" :key="bookDataKey" v-if="listActive == bookDataKey && update">
			<view class="books-screen">
				<p class="amount">{{bookDataList.amount}}本图书<span class="screen-span" @click="classifyBtn">最热·全部</span></p>
				<view class="filtrate" v-if="filtrateOff">
					<view class="label">
						<view class="label-list">
							<p>排序
								<span class="pack" @click="packUpBtn">
									收起
									<i class="iconfont pack-up"></i>
								</span>
							</p>
							<view class="label-boxs">
								<view v-for="(classList,classKey) in bookDataList.sortList || sortList" :key="classKey" class="label-span"
								 :class="{'label-active':labelActive == classKey}" @click="labelBtn(classKey,classList)">{{classList}}
								</view>
							</view>
						</view>
						<view class="label-list" v-if="bookDataList.classList">
							<p>
								分类标签
							</p>
							<view class="label-boxs">
								<view class="label-span" :class="{'label-active': lcalssActive == labelKey}" v-for="(labelList,labelKey) in bookDataList.classList"
								 :key="labelKey" @click="labelListBtn(labelKey,labelList)">
									{{labelList}}
								</view>
							</view>
						</view>
					</view>
					<view class="shade" @click="packUpBtn"></view>
				</view>
			</view>
			<!-- 图书列表 -->
			<scroll-view class="bookrack-body" scroll-y="true" lower-threshold="50" @scrolltolower="scrollToLower">
				<view class="books-box" v-for="(booksList,booksKey) in bookDataList.books" :key="booksKey" @click="booksBtn($event,booksKey,'bookHeight' + booksKey,booksList,booksList)"
				 :id="'bookHeight' + booksKey">
					<view class="books-image">
						<image class="book-img" :src="booksList.url || url[booksKey%10]"></image>
					</view>
					<view class="books-text">
						<view class="text-box">
							<view class="books-head">{{booksList.title || booksList.head}}</view>
							<view class="books-describe">{{booksList.abstract || booksList.text}}</view>
						</view>
						<view class="books-author">{{booksList.author}} 著</view>
					</view>
					<view class="ripple" v-if="booksKey == bookNum" :style="{ top: leftY + 'px', left: topX + 'px' , }"></view>
				</view>
				<u-loadmore :status="status"/>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		props: ['bookData', 'update','loadMore'],
		data() {
			return {
				status: 'loadmore',
				bookNum: null, //
				topX: '', //x轴
				leftY: '', //y轴
				filtrateOff: false, //筛选弹出层
				lcalssActive: 0, //分类标签
				labelActive: 0, //排序标签 0最热 1最新 2完结
				listActive: 0, //左边tab
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
					"https://s1.ax1x.com/2020/08/12/avpDSJ.png"
				],
				sortList: ['最热', '最新', '最火'],
			}
		},
		watch:{
			//监听loadMore变化
			loadMore(){
				this.status = 'loadmore'
			}
		},
		methods: {
			scrollToLower(){
				if(this.status==='loadmore'){
					this.status = 'loading'
					this.$emit('getMore')
				}
			},
			booksBtn(e, value, topH, booksdata) {
				//清空遗留数据
				this.bookNum = null
				this.topX = null
				this.leftY = null
				//开始脑残逻辑
				this.bookNum = value //第几个波纹效果显示
				this.topX = e.detail.x - 80 //获取相对于屏幕X轴坐标，并赋值 
				const query = uni.createSelectorQuery().in(this);
				query.select('#' + topH).boundingClientRect(data => {
					let cardT = JSON.stringify(data.top) //获取点击容器到顶距离
					let cardY = e.detail.y //获取相对于屏幕y轴坐标，并赋值
					this.leftY = Number(cardY) - Number(cardT) //计算容器内点击Y轴坐标
				}).exec();
				//接下来是组件父子交流
				let data = booksdata
				this.$emit('booksDataBtn', data);
			},
			listBtnOne(value, text) { //左边选项卡切换按钮
				this.lcalssActive = 0
				this.labelActive = 0
				this.bookNum = null
				this.listActive = value
				//接下来是组件父子交流
				let data = text
				this.$emit('listTabBtn', data);
			},
			labelBtn(value, text) { //排序标签 1最热 2最新 3完结
				this.labelActive = value

				//接下来是组件父子交流
				let data = text
				this.$emit('labelSortBtn', data);

			},
			labelListBtn(value, text) { //分类标签
				this.lcalssActive = value
				//接下来是组件父子交流
				let data = text
				this.$emit('classLabelBtn', data);
			},
			classifyBtn() { //打开筛选
				this.filtrateOff = true
			},
			packUpBtn() { //收起筛选
				this.filtrateOff = false
			}
		}
	}
</script>

<style scoped lang="scss">
	$classifyTopH:88upx;
	$booksH:176upx;
	$second: 0.6s;

	.books-body {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.books-left {
		flex: 1;
		min-width: 160upx;
		max-width: 160upx;
		height: 100%;
		overflow-y: auto;
		background-color: $bgLightGray;
	}

	.books-right {
		flex: 1;
		overflow-y: auto;
		min-width: calc(100% - 160upx);
		max-width: calc(100% - 160upx);

		.books-screen {
			height: 80upx;
			width: 100%;
			background-color: #fff;
			padding: 0 $bleed;

			.amount {
				font-size: 24upx;
				color: $mediumGrey;
				line-height: 80upx;

				.screen-span {
					float: right;
					height: 50upx;
					line-height: 46upx;
					font-size: 22upx;
					border: 2upx solid $brimColor;
					padding: 0 24upx;
					border-radius: 52upx;
					color: $blackAll;
					margin-top: 15upx;

				}
			}
		}

		.bookrack-body {
			height: calc(100% - 80upx);
			width: 100%;
			overflow-y: auto;
			padding-bottom: 40upx;
		}

		.books-box {
			display: flex;
			position: relative;
			overflow: hidden;
			height: $booksH + 40upx;
			padding: 20upx $bleed 20upx $bleed;
		}

		.books-image {
			flex: 1;
			min-width: 152upx;
			max-width: 152upx;
			height: $booksH;
			position: relative;
			z-index: 10;

			.book-img {
				width: 132upx;
				height: $booksH;
				border-radius: 8upx;
				overflow: auto;
				background-color: $skeletonColor;
			}
		}



		//波纹效果
		.ripple {
			width: 1px;
			height: 1px;
			position: absolute;
			z-index: -5;
			background-color: $rippleBg;
			box-shadow: 0 0 0px 500px $rippleBg;
			border-radius: 50%;
			animation: myfirst $second;
			opacity: 0.6;
		}

		.books-text {
			flex: 1;
			padding: 4upx 0;
			position: relative;
			z-index: 10 !important;

			.text-box {
				height: $booksH - 38upx;
			}

			.books-head {
				font-size: 28upx;
				line-height: 36upx;
				font-weight: 400;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin-bottom: 10upx;
			}

			.books-describe {
				color: $mediumGrey;
				font-size: 26upx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}

			.books-author {
				color: $mediumGrey;
				font-size: 26upx;
				line-height: 30upx;
				height: 30upx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}

	}



	.left-list {
		height: 120upx;
		line-height: 120upx;
		text-align: center;
		font-size: 28upx;
		color: $mediumGrey;

		.vertical-bar {
			display: none;
			height: 60upx;
			width: 8upx;
			background-color: $dominantHue;
			border-radius: 8upx;
			float: left;
			margin-top: 30upx;
		}
	}

	.books-left-active {
		color: $dominantHue;
		background-color: #fff;
		padding-right: 8upx;

		.vertical-bar {
			display: block;
		}
	}

	.bookrack-body::-webkit-scrollbar {
		display: none !important;
	}



	@keyframes myfirst {
		from {
			box-shadow: 0 0 0px 30px $rippleBg;
			opacity: 1;
			// z-index: 5!important;
		}

		to {
			box-shadow: 0 0 0px 500px $rippleBg;
			opacity: 0.5;
			// z-index: 5!important;
		}
	}

	.filtrate {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;

		.shade {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, 0.5);
		}

		.label {
			width: 100%;
			padding: 20upx $bleed 40upx $bleed;
			background-color: #fff;
			position: absolute;
			z-index: 200;

			.label-list {
				padding: 30upx 0 10upx 0;
				color: $mediumGrey;
				font-size: 24upx;

				.pack {
					color: $dominantHue;
					float: right;

					.pack-up {
						font-size: 24upx;
						margin-left: 4upx;
						display: inline-table;
					}
				}

				.label-boxs {
					padding: 0 10upx;

					.label-span {
						font-size: 26upx;
						color: $mediumGrey;
						display: inline-block;
						height: 56upx;
						line-height: 56upx;
						padding: 0 40upx;
						margin: 30upx 30upx 0 0;
						background-color: $bgLightGray;
						border-radius: 56upx;
					}

					.label-active {
						color: $dominantHue;
						background-color: $lightBlue;
					}
				}
			}
		}
	}
</style>
