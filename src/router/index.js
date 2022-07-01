import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import routes from "./routes.js";
import { Message } from "element-ui";

// import { Message } from "element-ui"
// Vue.prototype.$message = Message;

Vue.use(VueRouter);

//解决路由重复跳转报错问题
let originPush = VueRouter.prototype.push;
//重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const userData = store.state.user.loginUserData;
  //将要跳转的页面是否需要登录
  if (to.meta.isAuth === true) {
    //如果没有登录
    if (!userData.token) {
      console.log(Vue.prototype)
      Message.warning("请先登录")
      //若来的页面是需要验证的，则跳到首页
      if (from.meta.isAuth === true) {
        next("/");
      } else {
        //若来的页面是不需要验证的，则跳到来的地方
        next(from);
      }
      Vue.prototype.$bus.$emit("userActionDialog", true);
    }
  }
  next();
});

export default router;
