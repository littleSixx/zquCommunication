const state = { 
  choosedNav: Number(localStorage.getItem("choosedNav")) || 0, 
  choosedUserNav: Number(localStorage.getItem("choosedUserNav") || 0)
};
const mutations = {
  CHANGECHOOSENAV(state, index) {
    state.choosedNav = index;
    localStorage.setItem("choosedNav", index);
  },
  CHANGECHOOSEUSERNAV(state, index) {
    state.choosedUserNav = index;
    localStorage.setItem("choosedUserNav", index);
  },
};
const actions = {
  changeChoosedNav(content, index) {//更改选中的导航栏
    content.commit("CHANGECHOOSENAV", index);
  },
  changeChoosedUserNav(content, index) {//更改选中的用户导航栏
    content.commit("CHANGECHOOSEUSERNAV", index);
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
