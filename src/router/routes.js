let Index = () => import("@/views/Index/");
let LostAndFound = () => import("@/views/LostAndFound/");
let postDetail = () => import("@/views/PostDetail/");
let LostAndFoundEdit = () => import("@/views/LostAndFoundEdit/");
let postEdit = () => import("@/views/postEdit/");
let User = () => import("@/views/User");
let UserInfo = () => import("@/views/User/UserInfo/");
let UserPost = () => import("@/views/User/UserPost/");
let UserLostAndFound = () => import("@/views/User/UserLostAndFound/");
let MyFollow = () => import("@/views/MyFollow/");

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
      isShowNav: true,
      isAuth: false,
    },
  },
  {
    path: "/lost-and-found",
    redirect: "/lost-and-found/home",
    meta: {
      isShowNav: true,
      isAuth: false,
    },
  },
  {
    path: "/lost-and-found/home",
    name: "LostAndFoundHome",
    component: LostAndFound,
    meta: {
      isShowNav: true,
      isAuth: false,
    },
  },
  {
    path: "/lost-and-found/edit",
    name: "LostAndFoundEdit",
    component: LostAndFoundEdit,
    meta: {
      isShowNav: true,
      isAuth: true,
    },
  },
  {
    path: "/post-detail/:postId",
    name: "PostDetail",
    component: postDetail,
    meta: {
      isShowNav: true,
      isAuth: false,
    },
  },
  {
    path: "/post-edit",
    name: "PostEdit",
    component: postEdit,
    meta: {
      isShowNav: true,
      isAuth: true,
    },
  },
  {
    path: "/my-follow",
    name: "MyFollow",
    component: MyFollow,
    meta: {
      isShowNav: true,
      isAuth: true,
    },
  },
  {
    path: "/user",
    redirect: "/user/info",
  },
  {
    path: "/user",
    name: "User",
    component: User,
    // meta: {
    //   isShowNav: false,
    //   isAuth: true,
    // },
    children: [
      {
        path: "info",
        name: "Info",
        component: UserInfo,
        meta: {
          isShowNav: false,
          isAuth: true,
        },
      },
      {
        path: "post",
        name: "Post",
        component: UserPost,
        meta: {
          isShowNav: false,
          isAuth: true,
        },
      },
      {
        path: "lost-and-found",
        name: "LostAndFound",
        component: UserLostAndFound,
        meta: {
          isShowNav: false,
          isAuth: true,
        },
      },
    ],
  },
];
export default routes;
