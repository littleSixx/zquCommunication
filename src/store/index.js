import Vue from "vue";
import Vuex from "vuex";
import { reqIndexPostItem, reqUserRegister } from "@/network/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    choosedNav: Number(localStorage.getItem("choosedNav")) || 0,
    indexPostItem: [],
    loginUserData: {}
  },
  mutations: {
    CHANGECHOOSENAV(state, index) {
      state.choosedNav = index;
      localStorage.setItem("choosedNav", index);
    },
    GETINDEXPOSTITEM(state, data) {
      state.indexPostItem = data;
    },
    USERREGISTER(state, data) {
      state.loginUserData = data
    }
  },
  actions: {
    changeChoosedNav(content, index) {
      content.commit("CHANGECHOOSENAV", index);
    },
    async getIndexPostItem(content, pageConfig) {
      try {
        let result = await reqIndexPostItem(
          pageConfig.pageSize,
          pageConfig.pageNum
        );
        console.log(result);
        if (result.status === 200) {
          content.commit("GETINDEXPOSTITEM", result.data);
          return "ok";
        } else {
          return Promise.reject(new Error("faile"));
        }
      } catch (err) {
        console.log(err);
      }
    },
    async userRegister(content, registerData) {
      try {
        let result = await reqUserRegister(registerData);
        console.log(result);
        if (result.status === 200) {
          content.commit("GETINDEXPOSTITEM", result.data);
          return "ok";
        } else {
          return Promise.reject(new Error("faile"));
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
});
