import { reqIndexPostItem } from "@/network/index.js";

const state = { indexPostItem: [] };
const mutations = {
  GETINDEXPOSTITEM(state, data) {
    state.indexPostItem = data;
  },
};
const actions = {
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
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
