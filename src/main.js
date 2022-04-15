import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Navigate from './components/Navigate/'
import HeadBar from './components/HeadBar/'

Vue.component(Navigate.name, Navigate)
Vue.component(HeadBar.name, HeadBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
