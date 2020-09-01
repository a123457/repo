import {
  localSave,
  localRead,
  getMenuByRouter,
  getBreadCrumbList,
  getHomeRoute
} from '@/libs/util'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config
export default {
  state: {
    local: localRead('local'),
    breadCrumbList:[],
    homeRoute: getHomeRoute(routers, homeName),
    isCool: ''
  },
  getters: {
  	menuList: (state, getters, rootState) => getMenuByRouter(routers, ["xzy", "admin"])
  },
  mutations: {
  	setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    saveCool (state, cool) {
    	state.isCool = cool 
    }
  },
  actions: {

  }
}
