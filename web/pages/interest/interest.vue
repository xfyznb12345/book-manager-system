<template>
	<view class="content">
		<view class="cu-bar bg-white margin-top">
			<view class='action'>
				<text class='cuIcon-title text-blue'></text>可选兴趣
			</view>
		</view>
		<view class='padding-sm flex flex-wrap'>
			<view class="padding-xs" v-for="(item,index) in tagList" :key="index" v-if="item.name!='gray'">
				<view class='cu-tag light radius' :class="'bg-' + item.name" @click="handleDowm(item,index)">{{item.title}}</view>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class='action'>
				<text class='cuIcon-title text-blue'></text>已选兴趣
			</view>
		</view>
		<view class='padding-sm flex flex-wrap'>
			<view class="padding-xs" v-for="(item,index) in handList" :key="index" v-if="item.name!='white'">
				<view class='cu-tag radius size' :class="'line-' + item.name" @click="handleUp(item,index)">{{item.title}}</view>
			</view>
		</view>
		<view class="padding btn-bottom">
			<button class="cu-btn bg-black lg" @click="confirm">保存</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed:{
			...mapState(['userInfo'])
		},
		data() {
			return {
				tagList: [],
				handList: [],
				colorList: [
					'red',
					'orange',
					'yellow',
					'olive',
					'green',
					'cyan',
					'blue',
					'purple',
					'mauve',
					'pink',
					'brown',
					'grey',
					'gray',
					'white',
				]
			}
		},
		methods: {
			async getTagList() {
				const res = await this.$api.interest()
				if (res) {
					let handList = this.userInfo.interest
					
					let tagList = res.filter(item=> handList.indexOf(item)===-1)
					for (let i = 0; i < res.length; i++) {
						if(i<tagList.length){
							this.tagList.push({
								name: this.colorList[Math.floor(Math.random() * this.colorList.length)],
								title: tagList[i]
							})
						}
						if(i<handList.length){
							this.handList.push({
								name: this.colorList[Math.floor(Math.random() * this.colorList.length)],
								title: handList[i]
							})
						}
					}
				}
			},
			handleUp(val,index){ //删除
				this.handList.splice(index,1)
				this.tagList.push(val)
			},
			handleDowm(val,index) {
				this.handList.push(val)
				this.tagList.splice(index,1)
			},
			async confirm() { //确认标签
				let tagList = []
				this.handList.forEach(val => {
					tagList.push(val.title)
				})
				const res = await this.$api.handleInt({
					tagList
				})
				if (res) {
					this.$store.commit('setUserInfo',res)
					uni.showToast({
						title:'修改成功'
					})
					uni.navigateBack({
						delta:1
					})
				}
			}
		},
		created() {
			this.getTagList()
		}
	}
</script>

<style scoped lang="scss">
	page {
		display: flex;
		padding: 0 $bleed;
	}

	.btn-bottom {
		text-align: center;
		left: 0;
		right: 0;
		position: fixed;
		bottom: 100rpx;
	}
</style>
