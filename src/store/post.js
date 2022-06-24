import { postArticle, likePost, reqPostItems, reqPostDetail } from "../network";
import { Message } from "element-ui";

const state = { postItems: [], postDetail: {} };
const mutations = {
  GETPOSTITEMS(state, data) {
    state.postItems = data;
  },
  GETPOSTDETAIL(state, data) {
    state.postDetail = data;
  },
};
const actions = {
  async likePost(content, payload) {
    try {
      let result = await likePost(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.msg));
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getPostItems(content, payload) {
    try {
      let result = await reqPostItems(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        content.commit("GETPOSTITEMS", result.data.data);
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getPostDetail(content, payload) {
    try {
      let result = await reqPostDetail(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        content.commit("GETPOSTDETAIL", result.data.data);
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      console.log(err);
    }
  },
  async postArticle(content, payload) {
    try {
      let result = await postArticle(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        // content.commit("GETPOSTDETAIL", result.data.data);
        Message.success("发布成功");
        return "ok";
      } else {
        Message.error(result.data.msg);
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      Message.error("发布失败");
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
