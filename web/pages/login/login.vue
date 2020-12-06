<template>
	<view class="container">
		<!-- 头部logo -->
		<view class="header">
			<image src="/static/book.png"></image>
		</view>
		<!-- 主体表单 -->
		<view class="main">
			<wInput v-model="userName" type="text" maxlength="11" placeholder="用户名" :focus="isFocus"></wInput>
			<wInput v-model="passWord" type="password" maxlength="11" placeholder="密码"></wInput>
		</view>
		<wButton class="wbutton" text="登 录" :rotate="isRotate" @click="startLogin"></wButton>
		<!-- 底部信息 -->
		<view class="footer">
			<navigator url="forget" open-type="navigate">找回密码</navigator>
			<text>|</text>
			<navigator url="register" open-type="navigate">注册账号</navigator>
		</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		mapMutations
	} from 'vuex';
	export default {
		components: {
			wInput,
			wButton,
		},
		data() {
			return {
				userName: '', //用户/电话
				passWord: '', //密码
				isRotate: false, //是否加载旋转
				isFocus: false // 是否聚焦
			}
		},
		methods: {
			...mapMutations(['login']),
			async startLogin(e) {
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false
				}
				if (this.userName.length == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空',
					})
					return
				}
				if (this.passWord.length < 5) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确',
					})
					return
				}
				this.isRotate = true
				uni.showLoading({
					title: '登录中'
				});
				const req = {
					userName: this.userName,
					passWord: this.passWord
				}
				const res = await this.$api.login(req)
				if (res) {
					uni.showToast({
						icon: 'success',
						position: 'bottom',
						title: '登录成功'
					})
					this.login(res) //存入store中
					uni.navigateBack({ //跳转回我的
						delta: 1
					})
				}
				this.isRotate = false
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;

		/* 头部 logo */
		.header {
			width: 161rpx;
			height: 161rpx;
			background-color: #FFFFFF;
			margin-top: 128rpx;
			margin-bottom: 72rpx;
			margin-left: auto;
			margin-right: auto;
		}

		.header image {
			width: 161rpx;
			height: 161rpx;
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
	}
</style>
