import {
  reqUserRegister,
  reqUserInfo,
  sendEmail,
  reqUserLogin,
} from "@/network/index.js";

const state = {
  loginUserData: window.localStorage.getItem("store")
    ? window.localStorage.getItem("store")
    : {},
};
const mutations = {
  // USERREGISTER(state, data) {
  //   state.loginUserData = data;
  // },
  USERLOGIN(state, data) {
    state.loginUserData = data;
  },
  CLEARLOGINUSERDATA(state) {
    state.loginUserData = {};
    window.localStorage.removeItem("store");
    console.log(window.localStorage.getItem("store"));
    console.log(state.loginUserData);
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
      if (result.status === 200) {
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
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
