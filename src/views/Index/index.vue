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
      pageNum: 1,
    };
  },
  created() {
    this.$store.dispatch("changeChoosedNav", 0); //进入该页面后，改变vuex中已选中的导航
    // console.log(this.pageNum)
    this.$store.dispatch("getIndexPostItem", {
      pageSize: this.pageSize,
      pageNum: this.pageNum,
    }); //获取帖子数据
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
