import request from "@/network/request.js";
import qs from "qs";
// import mockRequest from "@/network/mockRequest.js";

//获取失物招领首页的items
export const reqLostAndFoundItems = (payload) =>
    request({
        url: `/lost/page/${payload.currentPage}/${payload.pageSize}/${payload.uid ? payload.uid : ""}`,
        method: "get",
    });

//发布失物招领
export const addLostAndFound = (payload) =>
    request({
        url: `/lost/insert`,
        method: "post",
        data: {
            tName: payload.tName,
            tPlace: payload.tPlace,
            tTime: payload.tTime,
            tNum: payload.tNum,
            tDesc: payload.tDesc,
            tImg: payload.tImg
        }
    })

//给回复点赞
export const likeReply = (payload) =>
    request({
        url: `/reply/${payload.rid}`,
        method: "put",
        params: {
           flag: payload.isLike
        }
    })

//查询某个评论的所有回复
export const showReply = (payload) =>
    request({
        url: `/reply/page/${payload.pageSize}/${payload.currentPage}/${payload.cid}`,
        method: "get"
    })

//添加一个回复
export const addReply = (payload) =>
    request({
        url: `/reply`,
        method: "post",
        data: {
            cid: payload.cid,
            toUserId: payload.toUserId,
            fromUserId: payload.fromUserId,
            content: payload.content,
            flag: payload.isLike
        }
    })

//给评论点赞/取消点赞
export const likeComment = (payload) =>
    request({
        url: `/comment/${payload.cid}`,
        method: "put",
        params: {
            flag: payload.isLike
        }
    })

//查询某个帖子的所有评论
export const showComment = (payload) =>
    request({
        url: `/comment/page/${payload.pageSize}/${payload.currentPage}/${payload.aid}`,
        method: "get"
    })

//添加一个评论
export const addComment = (payload) =>
    request({
      url: `/comment`,
      method: "post",
      data: { articleId:payload.articleId, content:payload.content, userId:payload.userId }
    })

//查询某个用户所有关注的人
export const reqAllFollow = () =>
  request({
    url: `/follow/all`,
    method: "get",
  });

//查询某个用户是否已被关注
export const isFollow = (uid) =>
  request({
    url: `/follow/or/not/${uid}`,
    method: "get",
  });

//查询某个用户信息
export const findUserInfo = (uid) =>
  request({
    url: `/user/find/${uid}`,
    method: "get",
  });

//关注或取关他人
export const follow = (payload) =>
  request({
    url: `/follow/${payload.uid}`,
    method: "put",
    params: {
      isFollow: payload.isFollow,
    },
  });

//给帖子点赞
export const likePost = (payload) =>
  request({
    url: `/article/likeNum/${payload.aid}/${payload.flag}`,
    method: "put",
  });

//获取首页帖子列表
export const reqPostItems = (payload) =>
  request({
    url: `/article/page/${payload.pageNum}/${payload.pageSize}/${
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
