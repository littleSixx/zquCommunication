// import Vue from "vue";
export const myMixin = {
  data() {
    return {
      isLike: false,
      likeNum: 0,
      isComment: false,
      commentNum: 0,
      isCollect: false,
      collectValue: 0,
    };
  },
  created() {},
  watch: {
    //MainPostItem中postItem是通过props的方式获取的，这在data直接使用没问题
    //但是在PostDetail中postItem是通过computed的方式获取的，这在data不能直接使用
    //因此需要在watch监听postItem的改变，将postItem的数据赋给data，这样的话无论是props还是computed的数据，data都能拿到
    postItem: {
      immediate: true,
      handler() {
        this.likeNum = this.postItem.likeNum;
        this.isLike = this.postItem.isLike;
      },
    },
  },
  methods: {
    async handleLike(aid) {
      let flag = this.isLike ? -1 : 1;
      const payload = { aid, flag };
      try {
        await this.$store.dispatch("likePost", payload);
        this.isLike = !this.isLike;
        if (this.isLike) {
          this.likeNum++;
        } else this.likeNum--;
      } catch (err) {
        this.$message.error(err);
      }
    },
    // handleCollect() {
    //   this.isCollect = !this.isCollect;
    //   if (this.isCollect) this.collectValue++;
    //   else this.collectValue--;
    // },
    //点击评论按钮，跳转到详情页，并自动滚动到评论区域
    handleComment(postId) {
      // this.isComment = !this.isComment;
      this.$router.push({
        name: "PostDetail",
        params: { postId: postId || undefined },
      });
    },
  },
};
