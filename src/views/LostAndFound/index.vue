<template>
  <div class="lost-and-found" v-infinite-scroll="load">
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
            infinite-scroll-distance="200px"
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import LostAndFoundItem from "@/components/LostAndFoundItem/";
export default {
  name: "LostAndFound",
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
  created() {
    this.$store.dispatch("changeChoosedNav", 1);
    this.pageNum = 1;
    this.$store.commit("RESETLOSTANDFOUNDITEMSDATA");
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
  methods: {
    load() {
      if (this.pageNum <= this.lostAndFoundItems.totalPage || this.pageNum === 1) {
        let payload = { pageSize: this.pageSize, currentPage: this.pageNum };
        this.$store.dispatch("reqLostAndFoundItems", payload); //获取帖子数据
        this.pageNum++;
      }
    },
  }
};
</script>

<style lang="less" scoped>
.lost-and-found {
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
      min-width: 360px;
      min-height: 500px;
      transition: all 0.3s;
    }
  }
}
</style>
