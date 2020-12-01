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

const app = new Vue({
    ...App,
		store
})
app.$mount()
