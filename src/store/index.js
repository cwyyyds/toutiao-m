import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {}
  },
  // 修改数据的地方
  mutations: {
    setUser(state, payload) {
      state.user = payload
      // token放在本地存储
      setToken(payload)
    }
  }
})
