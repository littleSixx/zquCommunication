<template>
  <div class="index">
    <div class="container">
      <div class="main">
        <MainPostItem />
        <MainPostItem />
        <MainPostItem />
        <MainPostItem />
        <MainPostItem />
        <MainPostItem />
        <MainPostItem />
      </div>
      <Follow />
    </div>
  </div>
</template>

<script>
import Follow from "@/views/Index/Follow/";
import MainPostItem from "@/views/Index/MainPostItem/";


export default {
  name: "Index",
  components: {
    Follow,
    MainPostItem,
  },
  data() {
    return {
      pageSize: 2,
      pageNum: 1
    }
  },
  created() {
    this.$store.dispatch("getIndexPostItem", this.pageSize, this.pageNum)
  },
  mounted() {},
  methods: {},
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
      border-radius: @normal-radius;

      transition: all 0.3s;

      &:hover {
      }
    }
  }
}
</style>
