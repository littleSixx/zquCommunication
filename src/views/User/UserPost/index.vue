<template>
  <div class="user-post">user-post</div>
</template>

<script>
export default {
  name: "UserPost",
  created() {
    this.$store.dispatch("changeChoosedUserNav", 1);
  },
};
</script>

<style lang="less" scoped></style>
