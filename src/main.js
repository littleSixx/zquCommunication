import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "@/network/mock/mock.js";
import * as api from "@/network/index.js";
import infiniteScroll from "vue-infinite-scroll";
// import requests from "@/network/request.js"
// import VueElementUISkeleton from 'vue-elementui-skeleton';
import {
  Input,
  Select,
  Option,
  Button,
  Backtop,
  Badge,
  divider,
  Image,
  Avatar,
  Dialog,
  Radio,
  RadioGroup,
  Upload,
  Form,
  FormItem,
  Col,
  DatePicker,
  TimePicker,
  Progress,
  Drawer,
  Tooltip,
  Loading,
  Message,
  Pagination
} from "element-ui";
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
Vue.use(Upload);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Progress);
Vue.use(Drawer);
Vue.use(Tooltip);
Vue.use(Loading);
Vue.use(infiniteScroll);
Vue.use(Pagination);
// Vue.use(VueElementUISkeleton);

import Navigate from "./components/Navigate/";
import MobileNavigate from "./components/MobileNavigate/";
import HeadBar from "./components/HeadBar/";

Vue.component(Navigate.name, Navigate);
Vue.component(MobileNavigate.name, MobileNavigate);
Vue.component(HeadBar.name, HeadBar);

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = api;
    Vue.prototype.$message = Message;
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
