import {
  reqUserRegister,
  reqUserInfo,
  sendEmail,
  reqUserLogin,
  findUserInfo,
} from "@/network/index.js";
import { follow, isFollow, reqAllFollow } from "../network";
import { Message } from "element-ui";
import Vue from "vue";

const state = {
  loginUserData: window.localStorage.getItem("store")
    ? window.localStorage.getItem("store")
    : {},
  hoverUserProfileInfo: {},//用户查询某个用户的用户信息（跳到该用户的主页）
  allFollow: [],
};
const mutations = {
  // USERREGISTER(state, data) {
  //   state.loginUserData = data;
  // },
  USERLOGIN(state, data) {
    console.log("USERLOGIN:", data);
    state.loginUserData = data;
  },
  CLEARLOGINUSERDATA(state) {
    state.loginUserData = {};
    window.localStorage.removeItem("store");
    console.log(window.localStorage.getItem("store"));
    console.log(state.loginUserData);
  },
  REQHOVERUSERPROFILEINFO(state, data) {
    // state.hoverUserProfileInfo = data;
    //由于reqHoverUserProfileInfo和isFollow是同时发的请求，它们收到响应的时间不确定
    //为了防止hoverUserProfileInfo.isFollow被这里的data覆盖，故选中Object.assign
    Object.assign(state.hoverUserProfileInfo, data);
  },
  ISFOLLOW(state, data) {
    state.hoverUserProfileInfo.isFollow = data;
    console.log(state.hoverUserProfileInfo.isFollow);
  },
  REQALLFOLLOW(state, data) {
    state.allFollow = data;
  },
};
const actions = {
  async userRegister(content, registerData) {
    try {
      let result = await reqUserRegister(registerData);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  },
  async sendEmail(content, payload) {
    try {
      let result = await sendEmail(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      console.log(err);
    }
  },
  async userLogin(content, payload) {
    try {
      let result = await reqUserLogin(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        if (result.data.flag === true) {
          content.commit("USERLOGIN", result.data.data);
        }
        return result.data;
      } else {
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      console.log(err);
    }
  },
  async reqHoverUserProfileInfo(content, payload) {
    try {
      let result = await findUserInfo(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        if (result.data.flag === true) {
          content.commit("REQHOVERUSERPROFILEINFO", result.data.data);
        }
        return result.data;
      } else {
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      console.log(err);
    }
  },
  async isFollow(content, payload) {
    try {
      let result = await isFollow(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        content.commit("ISFOLLOW", result.data.data);
        return result.data;
      } else {
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      console.log(err);
    }
  },
  async follow(content, payload) {
    try {
      let result = await follow(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        Message.success("关注成功");
        Vue.prototype.$bus.$emit(
          "reqHoverUserProfileInfo",
          content.state.hoverUserProfileInfo.uid
        );
        return result.data;
      } else {
        Message.error("关注失败", result.data.msg);
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      Message.error("关注失败");
      console.log(err);
    }
  },
  async reqAllFollow(content) {
    try {
      let result = await reqAllFollow();
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        //若能找到关注列表信息（找不到信息的话data为null）
        if (result.data.data) {
          content.commit("REQALLFOLLOW", result.data.data);
        }
        // Message.success("关注成功");
        return result.data;
      } else {
        // Message.error("关注失败", result.data.msg);
        return Promise.reject(new Error("faile"));
      }
    } catch (err) {
      Message.error("出现错误");
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
