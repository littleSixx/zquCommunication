<template>
  <div class="add-reply">
    <el-avatar :src="loginUserData.avatarUrl" class="avatar" :size="54"></el-avatar>
    <div class="container">
      <el-input type="textarea" v-model="inputReply" @focus="handleTextareaFocus" placeholder="发布一条回复" :show-word-limit="true" :rows="2" ref="textarea" />
    </div>
    <el-button class="commit-button" @click="addReply" type="primary" size="mini">发布</el-button>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AddReply",
  components: {
  },
  props: {
    commentItem: {
      type: Object
    },
    toUserId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      //真正使用的item
      useItem: this.commentItem,
      inputReply: ""
    }
  },
  computed: {
    ...mapState({
      loginUserData: (state) => state.user.loginUserData.user
    })
  },
  created() {},
  methods: {
    addReply() {
      let payload = {
        cid: this.useItem.cid,
        toUserId: this.toUserId,
        fromUserId: this.loginUserData.uid,
        content: this.inputReply,
      }
      this.$store.dispatch("addReply", payload);
    },
    handleTextareaFocus() {
      // this.$refs.textarea.$attrs.rows = "4";
      // console.log(this.$refs.textarea)
    }
  }
};
</script>

<style scoped lang="less">
.add-reply {
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
