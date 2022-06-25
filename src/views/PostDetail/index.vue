<template>
  <div class="post-detail">
    <div class="container">
      <div class="main">
        <PostDetailHead :detailData="postItem" />
        <p v-html="postItem.acontent"></p>
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
import { myMixin } from "../../utils/myMixin";
export default {
  name: "PostDetail",
  components: {
    PostDetailHead,
  },
  mixins: [myMixin],
  data() {
    return {
      // likeNum: 0,
      // isLike: false,
      // collectValue: 0,
      // isCollect: false,
    };
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
  methods: {
    // handleLike() {
    //   this.isLike = !this.isLike;
    //   if (this.isLike) this.likeNum++;
    //   else this.likeNum--;
    // },
  },
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
      //防止图片过大导致越界,但没有用
      // max-width: 100%;
      ::v-deep img {
        max-width: 100%;
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
