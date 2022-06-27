<template>
  <div class="post-detail">
    <div class="container">
      <div class="main">
        <h1 class="atitle">{{ postItem.atitle }}</h1>
        <PostDetailHead :detailData="postItem" />
        <p v-html="postItem.acontent"></p>
        <!-- 评论详情 -->
        <div class="comment-detail">
          <el-divider content-position="center">评论详情</el-divider>
          <Comment />
        </div>
      </div>
    </div>
    <!-- 点赞，收藏等操作 -->
    <div class="operations">
      <div class="like" @click="handleLike(postItem.aid)">
        <el-badge :value="likeNum ? likeNum : 0" :max="99" class="item"
          ><i
            class="iconfont icon-good-filling"
            :class="{ 'is-like': isLike }"
          ></i
        ></el-badge>
      </div>
      <!-- 收藏，先不实现 -->
      <!-- <div class="collect">
        <el-badge :value="collectValue" :max="99" class="item"
          ><i
            class="iconfont icon-shoucangxiao"
            :class="{ 'is-collect': isCollect }"
          ></i
        ></el-badge>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostDetailHead from "@/components/PostDetailHead/";
import Comment from "./Comment";
import { myMixin } from "../../utils/myMixin";
export default {
  name: "PostDetail",
  components: {
    PostDetailHead,
    Comment
  },
  mixins: [myMixin],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      postItem: (state) => state.post.postDetail,
    }),
  },
  created() {
    const payload = { postId: this.$route.params.postId };
    this.$store.dispatch("getPostDetail", payload);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.post-detail {
  padding-left: 62px;
  padding-right: @normal-padding;
  margin-left: -54px; //用于放置点赞等按钮

  .container {
    min-height: 450px;
    margin-top: 3px;
    border-radius: @normal-radius;
    background: rgba(255, 255, 255, 0.85);
    padding: calc(@normal-padding*3) calc(@normal-padding*7);
    @media (max-width: @pad-max-width) {
      padding: calc(@normal-padding*3) calc(@normal-padding*3);
    }
    @media (max-width: @mobile-max-width) {
      padding: calc(@normal-padding*3) calc(@normal-padding);
    }

    .main {
      .atitle {
        font-weight: 800;
        font-size: 32px;
        letter-spacing: 3px;
        margin-bottom: 26px;
      }
      ::v-deep img {
        max-width: 100%;
      }
    }
    .comment-detail {
      margin-top: 70px;
      ::v-deep .el-divider__text {
        background-color: transparent;
      }
    }
  }

  .operations {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: sticky;
    width: 50px;
    bottom: 150px;
    margin-left: -54px;
    opacity: 0.85;

    @media (max-width: @mobile-max-width) {
      width: 100%;
      bottom: 50px;
      margin-left: 0px;
      .like,
      .collect {
        margin-right: 24px;
      }
    }

    .like,
    .collect {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 42px;
      height: 42px;
      margin-bottom: 10px;
      border-radius: 50%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #ffffff;

      &:hover {
        cursor: pointer;
      }
      &:hover i {
        color: #909399;
      }
      i {
        color: #555767;
        font-size: 24px;
        transition: all 0.1s;
      }
      .is-like {
        color: #fd99a0 !important;
      }
    }
  }
}
</style>
