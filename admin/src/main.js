import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/scss/reset.scss'
import '@/assets/scss/theme.scss'
import elementUtils from 'vue-element-utils'
import './mock'

Vue.config.productionTip = false
Vue.use(elementUtils);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
