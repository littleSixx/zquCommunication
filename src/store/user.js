import { reqUserRegister } from "@/network/index.js";

const state = { loginUserData: {} };
const mutations = {
  USERREGISTER(state, data) {
    state.loginUserData = data;
  },
};
const actions = {
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
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
