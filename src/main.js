import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入字体图标
import '@/assets/fonts/iconfont.css'

// 引入Vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入flexble
import 'amfe-flexible/index.min.js'

Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
