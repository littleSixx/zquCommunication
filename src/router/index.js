import Vue from "vue";
import VueRouter from "vue-router";
let Index = () => import("@/views/Index/");
let LostAndFound = () => import("@/views/LostAndFound/");
let postDetail = () => import("@/views/PostDetail/");
let LostAndFoundEdit = () => import("@/views/LostAndFoundEdit/");

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

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
  },
  {
    path: "/lost-and-found",
    redirect: "/lost-and-found/home"
  },
  {
    path: "/lost-and-found/home",
    name: "LostAndFoundHome",
    component: LostAndFound,
  },
  {
    path: "/lost-and-found/edit",
    name: "LostAndFoundEdit",
    component: LostAndFoundEdit,
  },
  {
    path: "/post-detail/:postId",
    name: "postDetail",
    component: postDetail,
  },
  // {
  //   path: "/pos-detail/:postId",
  //   name: "postDetail",
  //   component: postDetail,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
