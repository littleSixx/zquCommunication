import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import requests from "@/network/request.js"
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
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
