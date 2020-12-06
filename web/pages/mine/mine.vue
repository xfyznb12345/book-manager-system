<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box" @tap="chooseAvatar">
					<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{ isLogin ? userInfo.userName : '游客'}}</text>
				</view>
			</view>
		</view>
		<!-- 宫格列表 -->
		<view class="text-center paddingInfo">
			<view class="cu-list grid shadow" :class="['col-4','no-border']">
				<view class="cu-item radius" v-for="(item,index) in cuIconList" :key="index">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]"></view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>

		<view class="user-box paddingInfo">
			<view class="cu-list menu shadow">
				<!-- 收藏 -->
				<view class="cu-item solid-top">
					<view class="content">
						<text class="cuIcon-favorfill text-orange"></text>
						<text class="text-grey">我的收藏</text>
					</view>
					<view class="action">
						<text class="cuIcon-right text-grey"></text>
					</view>
				</view>
				<!-- 标签 -->
				<view class="cu-item ">
					<view class="content">
						<text class="cuIcon-tag text-red  margin-right-xs"></text>
						<text class="text-grey">我的兴趣</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">音乐</view>
						<view class="cu-tag round bg-olive light">电影</view>
						<view class="cu-tag round bg-blue light">旅行</view>
					</view>
				</view>
				<!-- 退出 -->
				<view class="cu-item ">
					<button class="cu-btn content" @click="loginOut">
						<text class="cuIcon-settings text-olive"></text>
						<text class="text-grey">退出登录</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState(['isLogin', 'userInfo'])
		},
		data() {
			return {
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}],
			}
		},
		methods: {
			chooseAvatar() {
				this.$u.route({
					url: './u-avatar-cropper',
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			...mapMutations(['logout']),
			//检查login
			checkLogin() {
				uni.getStorage({
					key: 'user_token',
					fail(err) {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})
			},
			//退出登录
			loginOut() {
				uni.showModal({
					content: '确定要退出登录么',
					success: (e) => {
						if (e.confirm) {
							this.logout();
						}
					}
				});
			},
		},
		created() {
			const loginRes = this.checkLogin();
			if (!loginRes) {
				return false;
			}
		}
	}
</script>
<style lang='scss'>
	.user-section {
		height: 350upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username {
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}

	}

	.paddingInfo {
		padding: 20rpx 20rpx 0 20rpx;
	}
</style>
