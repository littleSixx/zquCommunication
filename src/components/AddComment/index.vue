<template>
  <div class="add-comment">
    <el-avatar :src="loginUserData.avatarUrl" class="avatar" :size="55"></el-avatar>
    <div class="container">
      <el-input type="textarea" v-model="inputComment" @focus="handleTextareaFocus" placeholder="发布一条评论" :show-word-limit="true" :rows="3" ref="textarea" />
    </div>
    <el-button class="commit-button" @click="addComment" type="primary" size="mini">发布</el-button>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AddComment",
  components: {
  },
  props: {
    postItem: {
      type: Object
    }
  },
  data() {
    return {
      inputComment: ""
    }
  },
  computed: {
    ...mapState({
      loginUserData: (state) => state.user.loginUserData.user
    })
  },
  created() {
    console.log(this.postItem)
  },
  methods: {
    addComment() {
      let payload = {
        articleId: this.postItem.aid,
        content: this.inputComment,
        userId: this.postItem.uid
      }
      this.$store.dispatch("addComment", payload);
    },
    handleTextareaFocus() {
      // this.$refs.textarea.$attrs.rows = "4";
      // console.log(this.$refs.textarea)
    }
  }
};
</script>

<style scoped lang="less">
.add-comment {
  position: relative;
  .avatar {
    position: absolute;
    top: 0;
    left: 0;
  }
  .container {
    margin-left: 65px;
    margin-right: 70px;
  }
  .commit-button {
    position: absolute;
    top: 0;
    right: 0;
    height: 50px;
    ::v-deep span {
      font-size: 14px;
    }
  }
}
</style>
