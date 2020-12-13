<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box" @tap="chooseAvatar">
					<image class="portrait" :src="userInfo.icon ? (this.$api.imgUrl + userInfo.icon) : '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{ !hasLogin ? '游客':userInfo.nickName ? userInfo.nickName:userInfo.userName}}</text>
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
				<!-- 个人资料 -->
				<view class="cu-item solid-top">
					<button class="cu-btn content" @click="infoChange">
						<view class="content">
							<text class="cuIcon-infofill text-yellow"></text>
							<text class="text-grey">个人资料</text>
						</view>
						<view class="action">
							<text class="cuIcon-right text-grey"></text>
						</view>
					</button>
				</view>
				<!-- 收藏 -->
				<view class="cu-item solid-top">
					<button class="cu-btn content" @click="navigate">
						<view class="content">
							<text class="cuIcon-favorfill text-orange"></text>
							<text class="text-grey">我的借阅</text>
						</view>
						<view class="action">
							<text class="cuIcon-right text-grey"></text>
						</view>
					</button>
				</view>
				<!-- 标签 -->
				<view class="cu-item ">
					<button class="cu-btn content" @click="interest">
					<view class="content">
						<text class="cuIcon-tag text-red  margin-right-xs"></text>
						<text class="text-grey">我的兴趣</text>
					</view>
					<view class="action">
						<text class="cuIcon-right text-grey"></text>
						<!-- <view class="cu-tag round bg-orange light">{{userInfo.interest[0]}}</view> -->
					</view>
					</button>
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
		watch:{
			isLogin(){
				this.hasLogin = this.isLogin
			}
		},
		data() {
			return {
				hasLogin: false, //登录状态
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '好友'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '书坛'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '动态'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}],
			}
		},
		methods: {
			...mapMutations(['logout']),
			infoChange(){ //个人资料修改
			
				// uni.navigateTo({
				// 	url: '../set/set',
				// });
			},
			//跳转借阅
			navigate() {
				
			},
			interest(){ //打开兴趣单
				uni.navigateTo({
					url:'../interest/interest'
				})
			},
			chooseAvatar() { //上传头像
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: this.$api.avatar,
							filePath: tempFilePaths[0],
							header: {
								'Authorization': 'Bearer ' + uni.getStorageSync('user_token')
							},
							name: 'icon',
							formData: {
								id: this.userInfo._id
							},
							success: (res) => {
								this.$store.commit('setUserInfo', JSON.parse(res.data).data)
							}
						})
					}
				})
			},
			checkLogin() { //检查登录
				try {
					const value = uni.getStorageSync('user_token');
					if (value) {
						this.hasLogin = true
						this.$store.commit('setUserInfo', uni.getStorageSync('userInfo'))
					} else {
						this.hasLogin = false
					}
				} catch (e) {
					// error
				}
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
			this.checkLogin()
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login'
				})
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
