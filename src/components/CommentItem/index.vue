<template>
  <div class="comment-item">
    <el-avatar class="avatar" :src="useItem.avatarUrl"></el-avatar>
    <div class="container">
      <p class="username">{{useItem.username}}</p>
      <span class="time">{{useItem.createDateTime}}</span>
      <p class="text">
        {{useItem.content}}
      </p>
      <div class="comment-bottom">
        <div
            class="like"
            @click="handleCommentLike(useItem)"
            :class="{ 'is-like': useItem.isLike }"
        >
          <el-badge :value="useItem.likeNum ? useItem.likeNum : 0" :max="99" class="item">
            <i class="iconfont icon-good-filling"></i>
          </el-badge>
        </div>
        <a class="reply" @click="replyToComment(useItem.userId, useItem.username, useItem.cid)">回复</a>
      </div>

      <!-- 回复区域 -->
      <div class="reply-box">
        <AddReply v-show="replyTextareaData.isShow" :addReplyData="addReplyData"/>
        <!-- 回复item -->
          <div class="reply-item" v-for="(reply) in commentReplys.replyList" :key="reply.rid">
            <el-avatar class="reply-avatar" :src="reply.fromUser.avatarUrl"  size="medium"></el-avatar>
            <div class="reply-container">
              <p class="reply-username">{{reply.fromUser.username}} 回复给 {{reply.toUser.username}}</p>
              <span class="reply-time">{{reply.createDateTime}}</span>
              <p class="reply-text">
                {{reply.content}}
              </p>
              <div class="reply-bottom">
                <div
                    class="like"
                    @click="handleReplyLike(reply)"
                    :class="{ 'is-like': reply.isLike }"
                >
                  <el-badge :value="reply.likeNum ? reply.likeNum : 0" :max="99" class="item">
                    <i class="iconfont icon-good-filling"></i>
                  </el-badge>
                </div>
                <a class="reply" @click="replyToComment(reply.fromUserId, reply.fromUser.username, useItem.cid)">回复</a>
              </div>
            </div>
          </div>
<!--        回复的分页-->
        <div class="pagination-container">
          <el-pagination class="my-reply-pagination" small hide-on-single-page layout="prev, pager, next" @current-change="replyChangePage" :page-size="pageSize" :page-count="commentReplys.maxPage" :total="commentReplys.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddReply from "@/components/AddReply";
import {mapState} from "vuex";
export default {
  name: "CommentItem",
  components: {
    AddReply
  },
  props: {
    commentItem: {
      type: Object
    }
  },
  data() {
    return {
      //真正使用的item数据
      useItem: this.commentItem,
      //该评论下的所有回复
      commentReplys: {},
      //是否显示 回复的textarea输入框
      replyTextareaData: {
        //上一次点击回复的用户id
        previousClickReplyId: -1,
        isShow: false
      },
      //传给回复框的数据
      addReplyData: {
        //指回复的对方id，用于传数据给回复框
        toUserId: 0,
        //指回复的对方名字，用于传数据给回复框
        toUsername: "",
        //回复给评论的评论id
        cid: 0,
        //回复给回复的回复id
        rid: 0
      },
      //回复的每页大小、当前页码
      pageSize: 4,
      pageNum: 1
    }
  },
  computed: {
    ...mapState({
      postItem: (state) => state.post.postDetail,
    }),
  },
  created() {
    this.reqCommentReplys();
  },
  methods: {
    // replyTextareaDataClick() {
    //   this.replyTextareaData.isShow = !this.replyTextareaData.isShow;
    // },
    async replyChangePage(page) {
      console.log("变化后的页码：", page)
      let payload = {
        pageSize : this.pageSize,
        currentPage : page,
        cid : this.commentItem.cid
      }
      try {
        let result = await this.$store.dispatch("showReply", payload);
        if(result) {
          this.commentReplys = result;
        }
      } catch (err) {
        console.log(err)
      }
    },
    async reqCommentReplys() {
      let payload = {
        pageSize: this.pageSize,
        currentPage: this.pageNum,
        cid: this.commentItem.cid
      }
      try {
        let result = await this.$store.dispatch("showReply", payload);
        if(result) {
          this.commentReplys = result;
        }
      } catch (err) {
        console.log(err)
      }
    },
    replyToReply(userId, username, rid) {
      this.addReplyData.toUserId = userId;
      this.addReplyData.toUsername = username;
      this.addReplyData.rid = rid;
      this.replyTextareaData.isShow = !this.replyTextareaData.isShow;
    },
    replyToComment(userId, username, cid) {
      this.addReplyData.toUserId = userId;
      this.addReplyData.toUsername = username;
      this.addReplyData.cid = cid
      this.replyTextareaData.isShow = !this.replyTextareaData.isShow;
    },
    async handleCommentLike(useItem) {
      const payload = { cid:useItem.cid, isLike:useItem.isLike };
      try {
        await this.$store.dispatch("likeComment", payload);
        useItem.isLike = !useItem.isLike;
        if (useItem.isLike) {
          useItem.likeNum++;
        } else useItem.likeNum--;
      } catch (err) {
        this.$message.error(err);
      }
    },
    async handleReplyLike(reply) {
      const payload = { rid:reply.rid, isLike:reply.isLike };
      try {
        await this.$store.dispatch("likeReply", payload);
        reply.isLike = !reply.isLike;
        if (reply.isLike) {
          reply.likeNum++;
        } else reply.likeNum--;
      } catch (err) {
        this.$message.error(err);
      }
    },
  }
};
</script>

<style scoped lang="less">
.comment-item {
  position: relative;
  width: 100%;
  .avatar {
    position: absolute;
    left: 0;
    top: 0;
  }
  .container {
    margin-left: 50px;
    color: #303133;
    // background-color: antiquewhite;
    .username {
      font-size: 16px;
    }
    .time {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 14px;
    }
    .text {
      font-size: 15px;
    }
    .comment-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 70px;
      .reply {
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          color: #0c7ed9;
        }
      }
    }

    .reply-box {
      // height: 150px;
      margin-left: 40px;
      margin-top: 16px;
      margin-bottom: 16px;
      // background-color: aquamarine;
      .reply-item {
        position: relative;
        .reply-avatar {
          position: absolute;
          top: 0;
          left: 0;
        }
        .reply-container {
          margin-left: 45px;
          .reply-username {
            font-size: 14px;
          }
          .reply-time {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 12px;
          }
          .reply-text {
            font-size: 14px;
          }
          .reply-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 65px;
            .reply {
              cursor: pointer;
              transition: all 0.2s;
              &:hover {
                color: #0c7ed9;
              }
            }
          }
        }
      }

      .my-reply-pagination {
        ::v-deep button, ::v-deep .el-pager li {
          background-color: transparent;
        }
      }

    }
  }

//
.like {
  display: inline-block;
  &:hover {
    cursor: pointer;
  }

  i {
    color: #555767;
    font-size: 20px;
    transition: all 0.2s;
  }
  i:hover {
    color: #909399;
  }
}
.is-like {
  i {
    color: #fd99a0 !important;
  }
}

}
</style>
