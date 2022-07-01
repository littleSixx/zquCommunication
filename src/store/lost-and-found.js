import {addLostAndFound, reqLostAndFoundItems} from "@/network/index.js";
import { Message } from "element-ui"
import router from "@/router"

const state = {
  lostAndFoundItems: {
    losts: [],
    totalPage: 0
  },
};
const mutations = {
  RESETLOSTANDFOUNDITEMSDATA(state) {
    state.lostAndFoundItems = {
      losts: [],
      totalPage: 0
    }
  },
  REQLOSTANDFOUNDITEMS(state, data) {
    state.lostAndFoundItems.losts = state.lostAndFoundItems.losts.concat(
        data.losts
    );
    state.lostAndFoundItems.totalPage = data.totalPage;
    // state.lostAndFoundItems = data;
  },
};
const actions = {
  async addLostAndFound(content, payload) {
    try {
      let result = await addLostAndFound(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        Message.success("发布成功");
        router.push("/lost-and-found/home");
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      console.log(err)
    }
  },
  async reqLostAndFoundItems(content, payload) {
    try {
      let result = await reqLostAndFoundItems(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        content.commit("REQLOSTANDFOUNDITEMS", result.data.data);
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
