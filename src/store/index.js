import Vue from "vue";
import Vuex from "vuex";
import navigate from "./navigate";
import post from "./post";
import lostAndFound from "./lost-and-found";
import user from "./user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
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
