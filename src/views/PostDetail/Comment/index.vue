<template>
  <div class="comment">
    <AddComment :postItem="postItem" />
    <!--  当有评论时，遍历评论  -->
    <div v-show="postComment.commentList.length > 0">
      <CommentItem v-for="commentItem in postComment.commentList" :key="commentItem.cid" :commentItem="commentItem" />
      <div class="pagination-container">
        <el-pagination background layout="prev, pager, next" @current-change="commentChangePage" :page-size="pageSize" :page-count="postComment.maxPage" :total="postComment.total">
        </el-pagination>
      </div>
    </div>
    <!--    当无评论时显示-->
    <div v-show="postComment.commentList.length === 0">
      <p style="text-align: center">暂无评论</p>
    </div>

  </div>
</template>

<script>
import AddComment from "@/components/AddComment"
import CommentItem from "@/components/CommentItem";
import {mapState} from "vuex";
export default {
  name: "Comment",
  components: {
    CommentItem,
    AddComment
  },
  props: {
    postItem: {
      type: Object
    }
  },
  data() {
    return {
      pageSize: 4,
      pageNum: 1
    }
  },
  computed:{
    ...mapState({
      postComment: (state) => state.post.postComment
    })
  },
  watch: {
    //当获取到aid之后再发送请求
    postItem: {
      deep: true,
      handler() {
        let payload = {
          pageSize : this.pageSize,
          currentPage : this.pageNum,
          aid : this.postItem.aid
        }
        this.$store.dispatch("showComment", payload);
      }
    }
  },
  created() {},
  methods: {
    //切换评论页码后，再次请求
    commentChangePage(page) {
      console.log("变化后的页码：", page)
      let payload = {
        pageSize : this.pageSize,
        currentPage : page,
        aid : this.postItem.aid
      }
      this.$store.dispatch("showComment", payload);
    }
  }
};
</script>

<style scoped lang="less">
.comment {
  .pagination-container {
    margin-top: 60px;
    text-align: center;
  }
}
</style>
