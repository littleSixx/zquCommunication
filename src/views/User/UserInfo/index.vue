<template>
  <div class="user-info">
    user-info
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  created() {
    this.$store.dispatch("changeChoosedUserNav", 0)
  }
}
</script>

<style lang="less" scoped>

</style>