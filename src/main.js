import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Input, Select, Option, Button, Backtop, Badge, divider, Image, Avatar, Dialog, Radio, RadioGroup } from 'element-ui'
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Backtop);
Vue.use(Badge);
Vue.use(divider);
Vue.use(Image);
Vue.use(Avatar);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(RadioGroup);

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
