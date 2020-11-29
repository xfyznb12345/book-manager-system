import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import uView from "uview-ui";
import request from './common/request.js'
import api from './common/http.js'
Vue.component('cu-custom', cuCustom)
Vue.config.productionTip = false
Vue.use(uView);

Vue.prototype.$request = request
Vue.prototype.$api = api

App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()