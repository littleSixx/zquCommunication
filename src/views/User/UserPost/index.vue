<template>
  <div class="user-post" v-infinite-scroll="load">
    <!-- <MainPostItem
      v-for="(postItem, index) in postItemsData.articles"
      :postItem="postItem"
      :key="index"
    /> -->
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
    <!-- <MainPostItem />
    <MainPostItem />
    <MainPostItem /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import MainPostItem from "@/views/Index/MainPostItem/";
export default {
  name: "UserPost",
  components: {
    MainPostItem,
  },
  data() {
    return {
      postItemsData: { articles: [], totalPage: 0 },
      pageNum: 1,
      pageSize: 3,
    };
  },
  computed: {
    ...mapState({
      loginUserData: (state) => state.user.loginUserData,
      hoverUserProfileInfo: (state) => state.user.hoverUserProfileInfo,
    }),
  },
  created() {
    this.$store.dispatch("changeChoosedUserNav", 1);
    this.pageNum = 1;
  },
  methods: {
    load() {
      if (this.pageNum <= this.postItemsData.totalPage || this.pageNum === 1) {
        // let payload = { pageSize: this.pageSize, pageNum: this.pageNum };
        this.reqPostItemsByUid(); //获取帖子数据
        this.pageNum++;
      }
    },
    //根据用户id获取该id发布的帖子
    async reqPostItemsByUid() {
      const payload = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        uid: this.$route.params.uid,
      };
      try {
        let result = await this.$API.reqPostItems(payload);
        if (result.status === 200 && result.data.flag === true) {
          this.postItemsData.articles = this.postItemsData.articles.concat(
            result.data.data.articles
          );
          this.postItemsData.totalPage = result.data.data.totalPage;
        }
      } catch (err) {
        this.$message.error("出现错误");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user-post {
  padding: 0 @normal-padding*2;
}
</style>
