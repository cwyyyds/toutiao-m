import Vue from 'vue'
import Vuex from 'vuex'
import {
  getToken,
  setToken,
  getHistory,
  setHistory,
  removeHistory
} from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {},
    historyList: getHistory() || []
  },
  // 修改数据的地方
  mutations: {
    setUser(state, payload) {
      state.user = payload
      // token放在本地存储
      setToken(payload)
    },
    setHistory(state, payload) {
      state.historyList = payload
      // token放在本地存储
      setHistory(payload)
    },
    removeHistory(state) {
      state.historyList = []
      removeHistory()
    }
  }
})
