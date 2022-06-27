<template>
  <div class="index" v-infinite-scroll="load">
    <div class="container">
      <div
        class="main"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
      >
        <ul
          class="infinite-list"
          infinite-scroll-immediate="false"
          style="overflow: auto"
        >
          <li
            v-for="postItem in postItemsData.articles"
            :key="postItem.postId"
            class="infinite-list-item"
          >
            <MainPostItem :postItem="postItem" />
          </li>
        </ul>
        <!-- <MainPostItem
          v-for="postItem in postItems"
          :key="postItem.postId"
          :postItem="postItem"
        /> -->
      </div>
      <Follow />
    </div>
  </div>
</template>

<script>
import Follow from "@/views/Index/Follow/";
import MainPostItem from "@/views/Index/MainPostItem/";
import { mapState } from "vuex";

export default {
  name: "Index",
  components: {
    Follow,
    MainPostItem,
  },
  data() {
    return {
      pageSize: 4,
      pageNum: 1,
      loading: true,
    };
  },
  created() {
    this.$store.dispatch("changeChoosedNav", 0); //进入该页面后，改变vuex中已选中的导航
    this.pageNum = 1;
    this.$store.commit("RESETPOSTITEMSDATA");
    // let payload = { pageSize: this.pageSize, pageNum: this.pageNum };
    // this.$store.dispatch("getPostItems", payload); //获取帖子数据
    //若已经登录，则请求关注列表
    if (this.loginUserData.token) {
      this.$store.dispatch("reqAllFollow"); //获取该用户关注的所有人
    }
  },
  mounted() {},
  methods: {
    load() {
      if (this.pageNum <= this.postItemsData.totalPage || this.pageNum === 1) {
        let payload = { pageSize: this.pageSize, pageNum: this.pageNum };
        this.$store.dispatch("getPostItems", payload); //获取帖子数据
        this.pageNum++;
      }
    },
  },
  computed: mapState({
    postItemsData: (state) => state.post.postItemsData,
    loginUserData: (state) => state.user.loginUserData,
  }),
  watch: {
    postItemsData: {
      deep: true,
      handler() {
        this.loading = false;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  display: flex;
  justify-content: center;
  margin-top: 3px;

  .container {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .main {
      flex: 1;
      margin: 0 @normal-padding;
      // min-width: 360px;
      min-height: 500px; //为了没加载出来时也能有“加载中”显示的高度
      border-radius: @normal-radius;
      transition: all 0.3s;
    }
  }
}
</style>
