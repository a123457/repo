import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import i18n from '@/locale'
import store from '@/store'
import router from '@/router'
import echarts from 'echarts'
import $ from '@/libs/axios'
import config from '@/config'
import '@/assets/icons/iconfont.css'
Vue.prototype.$echarts = echarts
Vue.prototype.$xzy = $
Vue.prototype.$config = config
Vue.config.productionTip = false
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
Vue.directive('xzy', {
  inserted: function (el, binding, vnode) {
    el.value = binding.value()
    el.addEventListener('change', function (event) {

    })
  }
})
Vue.use(contentmenu)
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
