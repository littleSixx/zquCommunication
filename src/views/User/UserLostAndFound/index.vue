<template>
  <div class="user-lost-and-found" v-infinite-scroll="load">
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
            v-for="lostAndFoundItem in lostAndFoundItems.losts"
            :key="lostAndFoundItem.tid"
            class="infinite-list-item"
        >
          <LostAndFoundItem
              :lostAndFoundItem="lostAndFoundItem"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LostAndFoundItem from "@/components/LostAndFoundItem/";
import {mapState} from "vuex";
export default {
  name: "UserLostAndFound",
  components: {
    LostAndFoundItem,
  },
  data() {
    return {
      loading: true,
      pageSize: 4,
      pageNum: 1
    }
  },
  computed: mapState({
    lostAndFoundItems: (state) => state.lostAndFound.lostAndFoundItems,
  }),
  watch: {
    lostAndFoundItems: {
      deep: true,
      handler() {
        this.loading = false
      }
    }
  },
  created() {
    this.$store.dispatch("changeChoosedUserNav", 2);
    this.pageNum = 1;
    this.$store.commit("RESETLOSTANDFOUNDITEMSDATA");
  },
  methods: {
    load() {
      if (this.pageNum <= this.lostAndFoundItems.totalPage || this.pageNum === 1) {
        let uid = this.$route.params.uid;
        let payload = { pageSize: this.pageSize, currentPage: this.pageNum, uid };
        this.$store.dispatch("reqLostAndFoundItems", payload); //获取帖子数据
        this.pageNum++;
      }
    },
  }
};
</script>

<style lang="less" scoped>
.user-lost-and-found {
  padding: @normal-padding*2;
}
</style>
