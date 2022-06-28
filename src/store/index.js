import Vue from "vue";
import Vuex from "vuex";
import navigate from "./navigate";
import post from "./post";
import lostAndFound from "./lost-and-found";
import user from "./user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requestUrl: "http://10.12.2.100:8080",
  },
  mutations: {
    CLEARALLUSERDATA(state) {
      //清除所有用户信息信息
      state.user.loginUserData = {};
      state.user.allFollow = [];
      //清除帖子信息
      state.post.postItemsData = { articles: [], totalPage: 0 };
      state.post.postDetail = {};
      //清除失物招领信息
      // state.lostAndFindItems = {};
      window.localStorage.removeItem("store");

    }
  },
  actions: {},
  /* vuex数据持久化配置 */
  plugins: [
    createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
      storage: window.localStorage,
      // 存储的 key 的key值
      key: "store",
      paths: ["user"],
    }),
  ],
  modules: {
    navigate,
    user,
    post,
    lostAndFound,
  },
});
