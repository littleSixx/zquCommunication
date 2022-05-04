<template>
  <div class="user-lost-and-found">
    user-lost-and-found
  </div>
</template>

<script>
export default {
  name: "UserLostAndFound",
  created() {
    this.$store.dispatch("changeChoosedUserNav", 2);
  }
}
</script>

<style lang="less" scoped>
.user-lost-and-found {}
</style>