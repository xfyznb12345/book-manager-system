<template>
	<view>
		<classifylist :bookData="bookData" update @listTabBtn="TabBtn" @labelSortBtn="SortBtn" @classLabelBtn="classBtn" @booksDataBtn="booksBtn"/>
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
				bookData: [
					{ //左边选项卡标签
						list: '文学',
						amount: '2371',
						sortList: ['最热', '最新', '最火'],
						classList: ['全部', '散文随笔', '绘本画册', '纪实文学', '文学理论', '世界名著'],
						books: [{
								url: "https://s1.ax1x.com/2020/08/12/ajXteS.png",
								head: "血疫：埃博拉的故事",
								text: "来自热带雨林的危险病毒，可在 24 小时内乘飞机抵达地球上的任何城市。航空线路连接了全世界的所有城市，构成网络。",
								author: "理查德·普雷斯顿",
								id: "1"
							},
							{
								url: "https://s1.ax1x.com/2020/08/12/ajjt6x.png",
								head: "当呼吸化为空气",
								text: "全世界只有 0.12% 的人在 36 岁就患上肺癌，保罗·卡拉尼什（Paul Kalanithi）是其中之一。当你读到这本书时，他已经不在人世。",
								author: "保罗·卡拉尼什",
								id: "2"
							},
							{
								url: "https://s1.ax1x.com/2020/08/12/ajjfHS.png",
								head: "浮生六记",
								text: "《浮生六记》以作者夫妇生活为主线，记叙了平凡而又充满情趣的居家生活的浪游各地的所见所闻，伉俪情深，至死不复，始于欢乐，终于忧患，飘零他乡，悲切动人。",
								author: "沈复 ",
								id: "3"
					
							},
							{
								url: "https://s1.ax1x.com/2020/08/12/ajjHcq.png",
								head: "小人物:我和父亲乔布斯",
								text: "乔布斯生前唯一不承认的女儿，丽莎，用 7 年时间，完成一部亲笔自传，真实还原 30 年父女生活的悲喜细节，让人看见一个小女孩孤独而倔强的成长，也看见一个父亲的复杂人性。",
								author: "[美]丽莎·布伦南·乔布斯",
								id: "4"
					
							},
							{
								url: "https://s1.ax1x.com/2020/05/25/tpsFDH.png",
								head: "法语有意思：从入门到不放弃",
								text: "小野丽莎用她略带沙哑的嗓音，把那首法国香颂《La Vie en Rose》演绎得温柔中带着点慵懒，优雅感扑面而来。",
								author: "曾小so",
								id: "5"
					
							},
							{
								url: "https://s1.ax1x.com/2020/08/12/ajvsVU.png",
								head: "史蒂夫·乔布斯传（修订版）",
								text: "史蒂夫·乔布斯有如过山车般精彩的人生和炽热激越的性格成就了一个传奇。",
								author: "沃尔特·艾萨克森 ",
								id: "6"
					
							},
							{
								url: "https://s1.ax1x.com/2020/08/12/ajvTaD.png",
								head: "只有医生知道",
								text: "开创西医写作的新风格，寓知识于故事，使科普不再乏味。",
								author: "张羽",
								id: "7"
							},
						]
					},
					{ //左边选项卡标签
						list: '现代言情',
						amount: '8897',
						sortList: ['最热', '最新', '最火'],
						classList: ['全部', '散文随笔', '绘本画册', '纪实文学', '文学理论', '世界名著'],
						books: [
							{
								url: "https://s1.ax1x.com/2020/08/21/dNZM0U.jpg",
								head: "婚宠1001夜",
								text: "一觉睡醒，她发现自己被迫要嫁给一个年近六十、体虚肾亏的糟老头子，还有比她更苦逼的么？",
								author: "乔桥",
								id: "2"
							},
						]
					},
					{
						list: '古代言情',
						amount: '1489',
						sortList: ['最热', '最新', '最火'],
						classList: ['全部', '职场心理', '面试心理', '谈话心理'],
						books: [{
							url: "https://s1.ax1x.com/2020/08/12/ajjt6x.png",
							head: "当呼吸化为空气",
							text: "全世界只有 0.12% 的人在 36 岁就患上肺癌，保罗·卡拉尼什（Paul Kalanithi）是其中之一。当你读到这本书时，他已经不在人世。",
							author: "保罗·卡拉尼什",
							id: "2"
						}, ]
					},
					{
						list: '同人小说',
						amount: '6798',
						sortList: ['最热', '最新', '最火'],
						classList: ['全部', '文学艺术', '行为艺术', '话术艺术'],
						books: [{
							url: "https://s1.ax1x.com/2020/08/12/ajzdBV.png",
							head: "30 岁前的每一天：超实用梦想管理指南（新版）",
							text: "在 30 岁以后，过上你想要的生活，或许你还可以影响别人，改变世界。",
							author: "水湄物语",
							id: "8"
						}, ]
					},
					{
						list: '浪漫青春',
						amount: '754',
						sortList: ['最热', '最新', '最火'],
						books: [{
								url: "https://s1.ax1x.com/2020/08/12/avSLRJ.png",
								head: "超有料漫画中国史",
								text: "本书通过令人捧腹的段子和生动形象的手绘漫画，为你徐徐拉开中国历史的大幕。",
								author: "韩明辉",
								id: "9"
							},
							{
								url: "https://s1.ax1x.com/2020/08/12/avpDSJ.png",
								head: "最富足的投资",
								text: "《最富足的投资》是吉姆·罗杰斯写给女儿的人生投资课。在书中罗杰斯将自己的投资经验以及人生智慧通过 21 条投资准则的形式展现出来",
								author: "吉姆·罗杰斯",
								id: "12"
							},
						]
					},
				],
			}
		},
		methods:{
			TabBtn(data){ 
				// 组件左边选项卡切换按钮
				console.log('你点击了' + data + '分类')
			},
			SortBtn(data){
				// 组件排序标签按钮
				console.log('你点击了' + data + '分类')
			},
			classBtn(data){
				// 组件分类标签按钮
				console.log('你点击了' + data + '分类')
			},
			booksBtn(data){
				// 组件图书列表按钮
				console.log('你点击了ID为' + data.id + '的图书')
			}
		}
	}
</script>

<style>
</style>
