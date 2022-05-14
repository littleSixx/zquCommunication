import Vue from "vue";
import VueRouter from "vue-router";
let Index = () => import("@/views/Index/");
let LostAndFound = () => import("@/views/LostAndFound/");
let postDetail = () => import("@/views/PostDetail/");
let LostAndFoundEdit = () => import("@/views/LostAndFoundEdit/");
let postEdit = () => import("@/views/postEdit/");
let User = () => import("@/views/User")
let UserInfo = () => import("@/views/User/UserInfo/")
let UserPost = () => import("@/views/User/UserPost/")
let UserLostAndFound = () => import("@/views/User/UserLostAndFound/")
let MyFollow = () => import("@/views/MyFollow/")

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
    meta: {
      isShowNav: true
    },
  },
  {
    path: "/lost-and-found",
    redirect: "/lost-and-found/home",
    meta: {
      isShowNav: true
    },
  },
  {
    path: "/lost-and-found/home",
    name: "LostAndFoundHome",
    component: LostAndFound,
    meta: {
      isShowNav: true
    },
  },
  {
    path: "/lost-and-found/edit",
    name: "LostAndFoundEdit",
    component: LostAndFoundEdit,
    meta: {
      isShowNav: true
    },
  },
  {
    path: "/post-detail/:postId",
    name: "PostDetail",
    component: postDetail,
    meta: {
      isShowNav: true
    },
  },
  {
    path: "/post-edit",
    name: "PostEdit",
    component: postEdit,
    meta: {
      isShowNav: true
    },
  },
  {
    path: "/my-follow",
    name: "MyFollow",
    component: MyFollow,
    meta: {
      isShowNav: true
    }
  },
  {
    path: "/user",
    redirect: "/user/info"
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: {
      isShowNav: false
    },
    children: [
      {
        path: "info",
        name: "Info",
        component: UserInfo
      },
      { 
        path: "post",
        name: "Post",
        component: UserPost
      },
      { 
        path: "lost-and-found",
        name: "LostAndFound",
        component: UserLostAndFound
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
