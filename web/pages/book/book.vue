<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图书" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-olive shadow-blur round">搜索</button>
			</view>
		</view>
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in category" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.icon" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.icon" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in category" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				category: [],
				TabCur: 0,
				scrollLeft: 0,
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			async getNav() {
				const res = await this.$api.cate()
				this.category = res
				this.category.forEach(res => {
					res.type = 'image'
				})
			}
		},
		onLoad() {
			this.getNav()
		}
	}
</script>

<style>
</style>
