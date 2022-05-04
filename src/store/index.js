import Vue from "vue";
import Vuex from "vuex";
import navigate from "./navigate"
import post from "./post"
import lostAndFound from "./lost-and-found"
import user from "./user"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    navigate,
    user,
    post,
    lostAndFound
  },
});
