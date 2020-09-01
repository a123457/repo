import Vue from 'vue'
import iView from 'iview'
import i18n from '@/locale'
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
import 'iview/dist/styles/iview.css'
