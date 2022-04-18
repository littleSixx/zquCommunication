<template>
  <div class="lost-and-found">
    <div class="container">
      <!-- <Navigate /> -->
      <div class="main"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LostAndFound",
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
    height: 1500px;

    .main {
      flex: 1;
      margin:0 @normal-padding;
      // margin-left: 8px;
      min-width: 360px;
      border-radius: @normal-radius;
      background: rgba(255, 255, 255, 0.75);
      transition: all 0.3s;

      &:hover {
        background: rgba(255, 255, 255, 0.85);
      }
    }
  }
}
</style>
