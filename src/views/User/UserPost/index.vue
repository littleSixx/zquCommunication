<template>
  <div class="user-post">
    <MainPostItem />
    <MainPostItem />
    <MainPostItem />
    <MainPostItem />
  </div>
</template>

<script>
import MainPostItem from "@/views/Index/MainPostItem/"
export default {
  name: "UserPost",
  components: {
    MainPostItem
  },
  created() {
    this.$store.dispatch("changeChoosedUserNav", 1);
  },
};
</script>

<style lang="less" scoped>
.user-post {
  padding: 0 @normal-padding*2;
}
</style>
