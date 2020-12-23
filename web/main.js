import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import http from './common/http.js'
import request from './common/request.js'
import store from './store'


Vue.prototype.$api = http
Vue.prototype.$request = request
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
//全局用的假图

Vue.prototype.$imgUrl = [
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
]

const app = new Vue({
	...App,
	store
})
app.$mount()
