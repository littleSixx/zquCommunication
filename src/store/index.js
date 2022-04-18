import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    choosedNav: Number( localStorage.getItem('choosedNav') ) || 0
  },
  mutations: {
    CHANGECHOOSENAV(state, index) {
      state.choosedNav = index;
      localStorage.setItem('choosedNav', index)
    }
  },
  actions: {
    changeChoosedNav(content, index) {
      content.commit("CHANGECHOOSENAV", index);
    }
  },
  modules: {
  }
})
