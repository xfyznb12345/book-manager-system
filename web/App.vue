<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	//全局图标
	@import url("static/icon/iconfont.css");
	// 骨架css
	@import './static/css/skeleton.scss';
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
	page {
		font-size: 24upx;
		color: $blackAll;
		font-family: 'PingFangSC-Regular', 'Source Han Sans CN' !important;
	}
	
	image {
		width: auto;
		height: auto;
	}
	
	// 高度不包括内外边距解决方法
	* {
		box-sizing: border-box;
	}
</style>
