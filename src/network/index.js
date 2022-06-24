import request from "@/network/request.js";
import qs from "qs";
// import mockRequest from "@/network/mockRequest.js";

//给帖子点赞
export const likePost = (payload) =>
  request({
    url: `/article/likeNum/${payload.aid}/${payload.flag}`,
    method: "put",
  });

//获取首页帖子列表
export const reqPostItems = (payload) =>
  request({
    url: `/article/${payload.pageNum}/${payload.pageSize}/${
      payload.uid ? payload.uid : ""
    }`,
    method: "get",
  });

//获取首页帖子详细内容
export const reqPostDetail = (payload) =>
  request({
    url: `/article/findOne/${payload.postId}`,
    method: "get",
  });

export const reqLostAndFoundItems = () =>
  request({
    url: `/lostAndFoundItems`,
    method: "get",
  });

//发送邮箱验证码
export const sendEmail = (payload) =>
  request({
    url: `/mail`,
    method: "get",
    params: { receiver: payload.email },
  });

//验证邮箱验证码
export const verifyEmail = (payload) =>
  request({
    url: `/sms`,
    method: "post",
    data: { mail: payload.email, code: payload.code },
  });

//登录
export const reqUserLogin = (payload) =>
  request({
    url: `/user/login`,
    method: "post",
    data: qs.stringify({ email: payload.email, password: payload.password }),
  });

//注册
export const reqUserRegister = (payload) =>
  request({
    url: `/user/register`,
    method: "post",
    data: {
      username: payload.username,
      password: payload.password,
      avatarUrl:
        "http://10.12.2.100:8080/uploadImages/all/avatar_url/e84d1c0febdd481180131c60f851f100.jpg",
      gender: payload.gender,
      birthday: payload.birthday,
      userDesc: "",
      email: payload.email,
    },
    params: {
      code: payload.emailVerify,
    },
  });

//添加文章
export const postArticle = (payload) =>
  request({
    url: `/article/insert`,
    method: "post",
    data: {
      aTitle: payload.aTitle,
      aContent: payload.aContent,
    },
  });

export const reqUserInfo = (uid) =>
  request({
    url: `/userInfo`,
    method: "get",
    data: {
      uid,
    },
  });
