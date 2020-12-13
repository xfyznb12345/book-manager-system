<template>
	<view class="books-details">
		<view class="book-detail">
			<view class="detail-left">
				<image class="book-img" :src="bookInfo.image" />
			</view>
			<view class="detail-right">
				<view class="detail-right-box">
					<view class="title">{{bookInfo.title || '不明'}}</view>
					<view class="author">{{(bookInfo.author + ' 著')|| '不明'}}</view>
					<view class="tag">
						<view class="tag-title" v-for="item in bookInfo.tagList">{{item}}</view>
					</view>
					<view class="grade">
						<u-rate active-color="#FFB32F" :count="5" v-model="state.rate" @change="changeRate" />
					</view>
				</view>
				<view class="btn-box">
					<view class="readBtn">借阅</view>
					<view class="joinBtn" @click="changeCollect">{{state.collect ? '已收藏' : '加入收藏'}}</view>
				</view>
			</view>
		</view>
		<view class="book-jieshao">
			<u-read-more :toggle="true" show-height="76" :shadow-style="jieshaStyle" color="#0086E7" close-text="展开阅读全文"
			 font-size="26">
				<rich-text class="jiesha" :nodes="jiesha"></rich-text>
			</u-read-more>
		</view>
		<view class="catalogue-box">
			<view class="catalogue-left">
				关键词
			</view>
			<span class="catalogue-centre">{{bookInfo.keyWord||''}}</span>
			<view class="catalogue-right">
				<i class="iconfont catalogue" />
			</view>
		</view>
		<view class="review">
			<view class="review-head">评论</view>
			<view class="review-input">
				<input maxlength="150" confirm-type="go" placeholder="评论才是真爱" />
				<view class="review-btn">
					<i class="iconfont send" />
				</view>
			</view>
			<view class="review-list">
				<view class="review-box">
					<view class="user-message">
						<view class="message-img">
							<image class="user-img" src="https://s1.ax1x.com/2020/06/02/ttbbJU.jpg"></image>
						</view>
						<view class="message-name">
							<view class="head">
								努力努力再努力
							</view>
							<view class="star">
								<u-rate active-color="#FFB32F" size="26" current="5" :disabled='true' @change="changeRate" />
							</view>
						</view>
						<view class="message-praise">
							<view @click="iconActive" :class="{'icon-active':iconOFF}">
								<i class="iconfont love" />
							</view>
						</view>
					</view>
					<view class="con-tent">
						<p class="text">该书汇集了卡耐基的思想精华和激动人心的内容，是作者功的励志经典，出版后立即获得了广大读者的欢迎，成为西方世界的人文书。</p>
						<p class="time">2019-11-16</p>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rate: 0,
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
				bookInfo: {},
				state: {}, //收藏评分状态
				jiesha: `《人性的弱点》自出版以来，已被译成 58 种文字畅销于世界各地，
				全球总销量达 9000 余万册，拥有 4 亿多读者，稳居成功励志类图书榜首，
				是人类出版史上继《圣经》之后的第二大畅销书。
				该书汇集了卡耐基的思想精华和激动人心的内容，是作者功的励志经典，
				出版后立即获得了广大读者的欢迎，成为西方世界的人文书。无数读者通过阅读和实践书中介绍的各种方法，
				不仅走出困境，有的还成为人仰慕的杰出人士。只要不断研读本书，相信你也可以发掘自己的无穷潜力，创造辉煌的人生。`,
				iconOFF: false, //爱心激活开关
				jieshaStyle: {
					backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
					paddingTop: "80rpx",
					marginTop: "-80rpx",
				},
			};
		},
		onLoad(options) {
			this.getBookInfo(options.id)
		},
		methods: {
			async getBookInfo(id) {
				const res = await this.$api.bookInfo(id)
				if (res) {
					this.bookInfo = res
					this.state = this.bookInfo.bookRet
					this.bookInfo.image = this.url[Math.floor((Math.random() * this.url.length))] //随机安排一张图片
					res.abstract && (this.jiesha = res.abstract) //安排一下简介
				}
			},
			//改变收藏状态
			changeCollect() {
				this.state.collect = !this.state.collect
				this.changeColRate()
			},
			changeRate(value) { //改变评分
				this.state.rate = value
				this.changeColRate()
			},
			//收藏评价图书
			async changeColRate() {
				const res = await this.$api.bookCollectRate(
					this.state
				).catch(err => {
					this.$refs.uToast.show({
						title: '请先登录',
						type: 'warning'
					})
					this.state.collect = !this.state.collect //失败再改回来
					this.state.rate = 0
				})
				if (res) {
					this.$refs.uToast.show({
						title: '修改成功',
						type: 'success'
					})
				}
				console.log(this.state)
			},
			iconActive() {
				this.iconOFF = !this.iconOFF
			}
		},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
	.books-details {
		padding: 0 $bleed $navBoxHeight $bleed;
	}

	.book-detail {
		display: flex;
		padding-top: 40upx;

		.detail-left {
			flex: 1;
			min-width: 270upx;
			max-width: 270upx;
			height: 360upx;

			.book-img {
				width: 240upx;
				height: 360upx;
				border-radius: 12upx;
				background-color: $skeletonColor;
			}
		}

		.detail-right {
			height: 360upx;
			padding: 4upx 0;

			.detail-right-box {
				height: calc(100% - 64upx);
			}

			.title {
				font-size: 36upx;
				font-weight: 700;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				margin-bottom: 10upx;
			}

			.author {
				font-size: 26upx;
				color: $mediumGrey;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				padding-bottom: 20upx;
				overflow: hidden;
			}

			.tag {
				padding-bottom: 5upx;

				.tag-title {
					background-color: #EFF5FD;
					height: 48upx;
					line-height: 48upx;
					color: $mediumGrey;
					padding: 0 20upx;
					margin-right: 20upx;
					border-radius: 4upx;
					display: inline-block;
					font-size: 24upx;
				}
			}

			.grade {
				padding-top: 4upx;
			}

			.btn-box {
				.readBtn {
					background-color: $dominantHue;
					border: 1px solid $dominantHue;
					padding: 0 30upx;
					display: inline-block;
					height: 64upx;
					line-height: 64upx;
					border-radius: 4upx;
					color: #fff;
					cursor: pointer;
					font-size: 28upx;
					margin-right: 26upx;
				}

				.readBtn:active {}

				.joinBtn {
					border: 1px solid $dominantHue;
					color: $dominantHue;
					padding: 0 29upx;
					height: 64upx;
					line-height: 64upx;
					display: inline-block;
					border-radius: 4upx;
					cursor: pointer;
					font-size: 28upx;
				}
			}
		}

	}

	.book-jieshao {
		padding: 40upx 0 30upx 0;
		overflow: hidden;

		.jiesha {
			width: 100%;
			word-wrap: break-word;
			color: $mediumGrey;
			line-height: 48upx;
			font-size: 26upx;
		}
	}

	.catalogue-box {
		height: 96upx;
		line-height: 96upx;
		padding: 0 20upx;
		background-color: $lightBlue;
		border-radius: 4upx;
		font-size: 28upx;
		display: flex;
		margin-bottom: 60upx;

		.catalogue-left {
			flex: 1;
			max-width: 120upx;
		}

		.catalogue-centre {
			flex: 1;
			color: $mediumGrey;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

		.catalogue-right {
			flex: 1;
			max-width: 80upx;
			text-align: right;
		}
	}

	.review {
		.review-head {
			font-size: 32upx;
			font-weight: 700;
			margin-bottom: 30upx;
		}

		.review-input {
			$review: 84upx;
			height: $review;
			border-radius: 8upx;
			border: 1px solid $dominantHue;
			margin-bottom: 60upx;

			input {
				height: $review - 2upx;
				line-height: $review - 2upx;
				padding: 0 20upx;
				float: left;
				width: calc(100% - 112upx);
				font-size: 28upx;
				box-sizing: border-box;
			}

			.review-btn {
				float: right;
				height: $review - 2upx;
				line-height: $review - 2upx;
				width: 112upx;
				background-color: $dominantHue;
				text-align: center;

				.send {
					color: #fff;
					font-size: 48upx;
				}
			}
		}
	}

	.review-list {
		.review-box {
			$imgWidth: 96upx;
			padding-bottom: 40upx;

			.user-message {
				$userH: 76upx;
				display: flex;
				height: $userH;

				.message-img {
					flex: 1;
					height: $userH;
					min-width: $imgWidth;
					max-width: $imgWidth;

					.user-img {
						width: $userH;
						height: $userH;
						border-radius: 50%;
						background-color: $skeletonColor;
					}
				}

				.message-name {
					flex: 1;

					.head {
						font-size: 28upx;
						height: 44upx;
					}

					.star {
						height: 38upx;
						padding-top: 2upx;
					}
				}

				.message-praise {
					flex: 1;
					line-height: $userH - 20upx;
					min-width: 40upx;
					max-width: 40upx;
					text-align: right;
					padding: 10upx 0;

					.icon-active {
						.love {
							color: $redAll;
						}
					}

					.love {
						font-size: 34upx;
						color: #A3B0C0;
					}
				}

			}

			.con-tent {

				padding: 14upx 0 0 $imgWidth;

				.text {
					word-wrap: break-word;
					font-size: 26upx;
					line-height: 40upx;
					color: $mediumGrey;
				}

				.time {
					padding: 10upx 0 0 0;
					color: $lightGray;
					font-size: 24upx;
				}
			}

		}
	}
</style>
