import {
  postArticle,
  likePost,
  reqPostItems,
  reqPostDetail,
  showComment,
  addComment,
  likeComment,
  addReply, showReply,
  likeReply
} from "../network";
import { Message } from "element-ui";
import router from "@/router"

const state = {
    postItemsData: { articles: [], totalPage: 0 },
    postDetail: {},
    postComment: {
      commentList: []
    }
  };
const mutations = {
  CLEARPOSTCOMMENT(state) {
    state.postComment = {
      commentList: []
    }
  },
  GETPOSTITEMS(state, data) {
    state.postItemsData.articles = state.postItemsData.articles.concat(
      data.articles
    );
    state.postItemsData.totalPage = data.totalPage;
  },
  ADDPOSTITEMS(state, data) {
    state.postItems += data;
  },
  GETPOSTDETAIL(state, data) {
    state.postDetail = data;
  },
  RESETPOSTITEMSDATA(state) {
    state.postItemsData = { articles: [], totalPage: 0 };
  },
  SHOWCOMMENT(state, data) {
    if(data) {
      state.postComment = data;
    }
  }
};
const actions = {
  async likeReply(content, payload) {
    try {
      let result = await likeReply(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        Message.success("点赞成功");
        return "ok";
      } else {
        Message.error("点赞失败");
        return Promise.reject(new Error(result.data.msg));
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(new Error("点赞失败，请先登录"));
    }
  },
  async showReply(content, payload) {
    try {
      let result = await showReply(payload);
      if (result.status === 200 && result.data.flag === true) {
        return result.data.data;
      } else {
        return Promise.reject(new Error(result.data.msg));
      }
    } catch (err) {
      console.log(err);
    }
  },
  async addReply(content, payload) {
    try {
      let result = await addReply(payload);
      if (result.status === 200 && result.data.flag === true) {
        Message.success("回复成功");
        router.go(0);
        return "ok";
      } else {
        Message.error("回复失败");
        return Promise.reject(new Error(result.data.msg));
      }
    } catch (err) {
      Message.error("回复失败");
      console.log(err);
    }
  },
  async likeComment(content, payload) {
    try {
      console.log("payload", payload)
      let result = await likeComment(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        Message.success("点赞成功");
        return "ok";
      } else {
        Message.error("点赞失败");
        return Promise.reject(new Error(result.data.msg));
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(new Error("点赞失败，请先登录"));
    }
  },
  async addComment(content, payload) {
    try {
      console.log("payload", payload)
      let result = await addComment(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        Message.success("发布成功");
        router.go(0);
        return "ok";
      } else {
        Message.error("发布失败");
        return Promise.reject(new Error(result.data.msg));
      }
    } catch (err) {
      Message.error("发布失败");
      console.log(err);
    }
  },
  async showComment(content, payload) {
    try {
      let result = await showComment(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        content.commit("SHOWCOMMENT", result.data.data)
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.msg));
      }
    } catch (err) {
      console.log(err);
    }
  },
  async likePost(content, payload) {
    try {
      let result = await likePost(payload);
      console.log(result);
      if (result && result.status === 200 && result.data.flag === true) {
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.msg));
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(new Error("点赞失败,请先登录"));
    }
  },
  //刷新后获取首页帖子列表
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
  //获取首页帖子列表(后续请求)
  async addPostItems(content, payload) {
    try {
      let result = await reqPostItems(payload);
      console.log(result);
      if (result.status === 200 && result.data.flag === true) {
        content.commit("ADDPOSTITEMS", result.data.data);
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
        router.push("/index");
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
