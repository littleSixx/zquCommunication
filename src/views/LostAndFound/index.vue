<template>
  <div class="lost-and-found">
    <div class="container">
      <div
        class="main"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
      >
        <LostAndFoundItem
          v-for="lostAndFindItem in lostAndFindItems"
          :lostAndFindItem="lostAndFindItem"
          :key="lostAndFindItem.lostAndFoundId"
        />
        <!-- <LostAndFoundItem />
        <LostAndFoundItem />
        <LostAndFoundItem /> -->
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
      loading: true
    }
  },
  created() {
    this.$store.dispatch("changeChoosedNav", 1);
    this.$store.dispatch("getLostAndFoundItems");
  },
  computed: mapState({
    lostAndFindItems: (state) => state.lostAndFound.lostAndFindItems,
  }),
  watch: {
    lostAndFindItems() {
      this.loading = false
    }
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
