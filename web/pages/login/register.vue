<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="/static/book.png"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput v-model="userName" type="text" maxlength="11" placeholder="请输入用户名"></wInput>
				<wInput v-model="passWord" type="password" maxlength="11" placeholder="请输入密码" isShowPass></wInput>
			</view>
			<wButton class="wbutton" text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>
			<!-- 底部信息 -->
			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'"> 同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				userName: '', //用户名
				passWord: '', //密码
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
			}
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this;
		},
		methods: {
			...mapMutations(['login']),
			isShowAgree() {
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			async startReg() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
					uni.showToast({
						icon: 'none',
						title: '请先同意《协议》'
					});
					return false;
				}
				if (this.userName.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '用户名不得小于6位'
					});
					return false;
				}
				if (this.passWord.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '用户名不得小于6位'
					});
					return false;
				}
				_this.isRotate = true
				const req = {
					userName: this.userName,
					passWord: this.passWord
				}
				const res = await this.$api.register(req)
				if (res) {
					uni.showToast({
						icon: 'none',
						title: '注册成功'
					})
					this.login(res) //存入store中
					uni.navigateBack({ //跳转回我的
						delta: 2
					})
				}
				_this.isRotate = false
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* margin-top: 128rpx; */
	}

	/* 头部 logo */
	.header {
		width: 161rpx;
		height: 161rpx;
		box-shadow: 0rpx 0rpx 60rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		background-color: #000000;
		margin-top: 128rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.tips {
		color: #999999;
		font-size: 28rpx;
		margin-top: 64rpx;
		margin-left: 48rpx;
	}

	/* 登录按钮 */
	.wbutton {
		margin-top: 96rpx;
	}

	/* 底部 */
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.footer text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
