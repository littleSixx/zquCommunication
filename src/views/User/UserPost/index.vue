<template>
  <div class="user-post">
    <MainPostItem
      v-for="(postItem, index) in postItems"
      :postItem="postItem"
      :key="index"
    />
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
      postItems: [],
      pageNum: 1,
      pageSize: 10,
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
    this.reqPostItemsByUid();
  },
  methods: {
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
          this.postItems = result.data.data;
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
