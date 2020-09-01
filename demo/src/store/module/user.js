import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    token: getToken(),
    hasGetInfo:false
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
  },
  getters: {
   
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
          commit('setToken', 'xzy_lcs')
          resolve()
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
    	console.log(12)
      return new Promise((resolve, reject) => {
            commit('setUserName','admin')
            commit('setUserId','xzy')
            commit('setHasGetInfo', false)
            resolve()
          })
      }
  }
}
