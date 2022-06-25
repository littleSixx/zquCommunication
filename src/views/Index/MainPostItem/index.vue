<template>
  <div class="main-post-item">
    <!-- 用户头像/昵称/发表时间信息 -->
    <div class="author-info">
      <!-- 头像 -->
      <div
        class="avatar-container"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        ref="avatar"
      >
        <el-avatar class="avatar" :src="postItem.aimgUrl"></el-avatar>
      </div>
      <!-- 头像/鼠标移入出现详细信息 -->
      <!-- <HoverAvatar :avatarUrl="avatar" /> -->

      <div class="author-name">{{ postItem.username }}</div>
      <div class="post-time">{{ postItem.createTime }}</div>
    </div>
    <el-divider class="divider"></el-divider>
    <!-- 主题内容 ，"enterPostDetail(postId)中的postId由父组件v-for遍历的时候通过props传过来-->
    <div class="post-content" @click="enterPostDetail(postItem.aid)">
      <p class="selection-style" v-html="postItem.acontent"></p>
    </div>
    <!-- 点赞和评论按钮 -->
    <div class="operations">
      <div
        class="like"
        @click="handleLike(postItem.aid)"
        :class="{ 'is-like': isLike }"
      >
        <el-badge :value="likeNum ? likeNum : 0" :max="99" class="item">
          <i class="iconfont icon-good-filling"></i>
        </el-badge>
      </div>
      <!-- 收藏，先不实现 -->
      <!-- <div
        class="collect"
        @click="handleCollect"
        :class="{ 'is-collect': isCollect }"
      >
        <el-badge :value="postItem.collectNum" :max="99" class="item">
          <i class="iconfont icon-shoucangxiao"></i>
        </el-badge>
      </div> -->
      <div
        class="comment"
        @click="handleComment(postItem.aid)"
        :class="{ 'is-comment': isComment }"
      >
        <el-badge :value="postItem.commentValue" :max="99" class="item">
          <i class="iconfont icon-pinglun"></i>
        </el-badge>
      </div>
    </div>
    <!-- 评论详情 -->
    <div class="comment-detail" v-if="isComment">
      <el-divider content-position="center">评论详情</el-divider>
      test
    </div>
  </div>
</template>

<script>
import { myMixin } from "../../../utils/myMixin";
// import HoverAvatar from "@/components/HoverAvatar/";

export default {
  name: "MainPostItem",
  components: {
    // HoverAvatar,
  },
  mixins: [myMixin],
  data() {
    return {
      // isLike: false,
      // likeValue: 0,
      // isComment: false,
      // commentValue: 0,
      // isCollect: false,
      // collectValue: 0,
    };
  },
  props: {
    // avatar: {
    //   type: String,
    //   default: "/images/default_avatar.png",
    // },
    postItem: {
      type: Object,
    },
  },
  created() {},
  methods: {
    handleAvatarImage() {
      return {
        backgroundImage: `url(${this.avatar})`,
      };
    },
    // handleLike() {
    //   this.isLike = !this.isLike;
    //   if (this.isLike) this.likeValue++;
    //   else this.likeValue--;
    // },
    // handleCollect() {
    //   this.isCollect = !this.isCollect;
    //   if (this.isCollect) this.collectValue++;
    //   else this.collectValue--;
    // },
    // handleComment() {
    //   this.isComment = !this.isComment;
    // },
    enterPostDetail(postId) {
      // console.log(postId)
      // this.$router.push(`/postDetail/${postId}`)
      this.$router.push({
        name: "PostDetail",
        params: { postId: postId || undefined },
      });
    },
    handleMouseEnter() {
      const payload = {
        left: this.$refs.avatar.getBoundingClientRect().left,
        top: this.$refs.avatar.getBoundingClientRect().top,
        postItem: this.postItem,
      };
      this.$bus.$emit("showUserProfileView", payload);
    },
    handleMouseLeave() {
      this.$bus.$emit("closeUserProfileView");
    },
  },
};
</script>

<style lang="less" scoped>
.main-post-item {
  width: 100%;
  // height: 400px;
  margin-bottom: @normal-padding;
  padding: 16px;
  border-radius: @normal-radius;
  // background: rgba(255, 255, 255, 0.70);
  background-color: #ffffff;
  opacity: 0.7;
  transition: all 0.2s;

  &:hover {
    // background: rgba(255, 255, 255, 0.85);
    opacity: 0.85;
  }

  .author-info {
    height: 46px;
    // background-color: antiquewhite;

    .avatar-container {
      float: left;
      width: 42px;
      height: 42px;
      //居中
      margin-top: 23px;
      transform: translateY(-50%);
      //
      color: #222;
      background-size: 100%;
      background-repeat: no-repeat;
      .avatar {
        ::v-deep img {
          width: 100%;
        }
        // width: 100%;
        // height: 100%;
      }
    }
    .author-name {
      float: left;
      //居中
      margin-top: 23px;
      margin-left: 12px;
      transform: translateY(-50%);
      //
      color: #303133;
      padding-left: @normal-padding;
      font-weight: 600;
    }

    .post-time {
      float: right;
      //居中
      margin-top: 23px;
      transform: translateY(-50%);
      //
      font-size: 12px;
      font-weight: 600;
      color: #303133;
      padding-left: @normal-padding;
    }
  }

  .post-content {
    margin-top: 20px;
    // line-height: 1.3em;

    &:hover {
      cursor: pointer;
    }
    p {
      position: relative;
      line-height: 1.4em;
      height: 5.6em;
      overflow: hidden;
      &::after {
        content: "...查看详情";
        font-weight: bold;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0 20px 1px 45px;
        color: #0c7ed9;
        // background: url("/images/default_avatar.png") repeat-y;
        // background-image: linear-gradient(to right, rgba(79, 172, 254, 0.5) 0%, #00f2fe 100%);
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }

  .operations {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;
    height: 50px;
    padding: 8px 24px;
    border-radius: 50px;
    // background-color: #f7f7f7;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);

    .like,
    .comment,
    .collect {
      &:hover {
        cursor: pointer;
      }

      i {
        color: #555767;
        font-size: 22px;
        transition: all 0.2s;
      }
      i:hover {
        color: #909399;
      }
    }
    .is-like,
    .is-comment,
    .is-collect {
      i {
        color: #fd99a0 !important;
      }
    }
  }

  .comment-detail {
    height: 500px;
  }

  .divider {
    margin: @normal-padding 0;
  }
}
</style>
