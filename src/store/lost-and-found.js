import { reqLostAndFoundItems } from "@/network/index.js";

const state = {
  lostAndFindItems: [],
};
const mutations = {
  GETLOSTANDFOUNDITEMS(state, data) {
    state.lostAndFindItems = data;
  },
};
const actions = {
  async getLostAndFoundItems(content) {
    try {
      let result = await reqLostAndFoundItems();
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        content.commit("GETLOSTANDFOUNDITEMS", result.data.data);
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      console.log(err)
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
