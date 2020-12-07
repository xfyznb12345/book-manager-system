import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		isLogin: false,
		userInfo: {}
	},
	mutations: {
		login(state, res) {
			state.isLogin = true;
			state.userInfo = res.userInfo;
			uni.setStorageSync('user_token', res.token); //存入缓存
			uni.setStorageSync('userInfo', res.userInfo); //存入缓存
		},
		logout(state) {
			state.isLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'user_token'
			})
			uni.removeStorage({
				key: 'userInfo'
			})
		}
	},
	actions: {}
})
export default store
