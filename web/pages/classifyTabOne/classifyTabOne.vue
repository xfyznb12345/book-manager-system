<template>
	<view>
		<classifylist :bookData="bookData" @listTabBtn="TabBtn" @labelSortBtn="SortBtn" @classLabelBtn="classBtn"
		 @booksDataBtn="booksBtn" :update="isShow" @getMore="getMore" :loadMore="isOk" />
	</view>
</template>

<script>
	import classifylist from '../../components/classifylist/classifylist.vue'
	export default {
		components: {
			classifylist
		},
		data() {
			return {
				bookData: [],
				code: '',
				pageNum: 1,
				pageSize: 10,
				sortIndex: 0, //当前分类下标
				isShow: true,
				isOk: false
			}
		},
		methods: {
			//加载更多
			async getMore() {
				this.pageNum++
				const req = {
					code: this.code,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				const res = await this.$api.bookList(req)
				if (res) {
					this.bookData[this.sortIndex].books.push(...res.list)
					console.log(this.bookData[this.sortIndex].books)
					this.isOk = !this.isOk
				}
			},
			//获取图书分类列表
			async getCategoryList() {
				const res = await this.$api.category()
				if (res) {
					this.bookData = res
					this.code = this.bookData[0].code //默认第一
					this.getBookList()
				}
			},
			//根据分类获取图书
			async getBookList() {
				const req = {
					code: this.code,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				const res = await this.$api.bookList(req)
				if (res) {
					this.isShow = false
					this.$nextTick(() => {
						this.bookData[this.sortIndex].amount = res.count
						this.bookData[this.sortIndex].books = res.list
						this.isShow = true
					})
				}
			},
			TabBtn(data) {
				// 组件左边选项卡切换按钮
				this.pageNum = 1 //重新置于第一页
				this.sortIndex = this.bookData.map(item => item.code).indexOf(data)
				this.code = data
				this.getBookList()
				console.log('你点击了' + data + '分类')
			},
			SortBtn(data) {
				// 组件排序标签按钮
				console.log('你点击了' + data + '分类')
			},
			classBtn(data) {
				// 组件分类标签按钮
				console.log('你点击了' + data + '分类')
			},
			booksBtn(data) {
				// 组件图书列表按钮
				console.log('你点击了ID为' + data._id + '的图书')
				uni.navigateTo({
					url: `../../pages/booksInfo/booksInfo?id=${data._id}`
				})
			}
		},
		created() {
			this.getCategoryList()
		}
	}
</script>

<style>
</style>
