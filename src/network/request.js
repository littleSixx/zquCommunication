import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store/index.js";
import router from "../router";
import { Message } from "element-ui"; //引入了element-ui框架库

const request = axios.create({
  baseURL: "http://10.12.2.100:8080",
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  if (store.state.user.loginUserData.token) {
    //给请求头添加字段
    config.headers.authorization = store.state.user.loginUserData.token;
  }
  nprogress.start();
  return config;
});

request.interceptors.response.use((res) => {
  nprogress.done();
  return res;
}, (error) => {
  if(error.response.status === 666) {
      Message.error("登录失效(￣﹃￣)");
      store.commit("CLEARALLUSERDATA");
      router.go(0);
      // try {
      //   router.replace("/");
      // } catch(err) {
      //   console.log(err);
      // }
  }
});

export default request;
