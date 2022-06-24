<template>
  <div class="index">
    <div class="container">
      <div
        class="main"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
      >
        <MainPostItem
          v-for="postItem in postItems"
          :key="postItem.postId"
          :postItem="postItem"
        />
        <!-- <MainPostItem />
        <MainPostItem />
        <MainPostItem />
        <MainPostItem />
        <MainPostItem />
        <MainPostItem /> -->
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
      pageSize: 10,
      pageNum: 1,
      loading: true,
    };
  },
  created() {
    this.$store.dispatch("changeChoosedNav", 0); //进入该页面后，改变vuex中已选中的导航
    // console.log(this.pageNum)
    let payload = { pageSize: this.pageSize, pageNum: this.pageNum };
    this.$store.dispatch("getPostItems", payload); //获取帖子数据
  },
  mounted() {},
  methods: {},
  computed: mapState({
    postItems: (state) => state.post.postItems,
  }),
  watch: {
    postItems() {
      this.loading = false;
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
      min-height: 300px; //为了没加载出来时也能有“加载中”显示的高度
      border-radius: @normal-radius;
      transition: all 0.3s;
    }
  }
}
</style>
