<template>
  <div class="lost-and-found">
    <div class="container">
      <!-- <Navigate /> -->
      <div class="main">
        <LostAndFoundItem />
        <LostAndFoundItem />
        <LostAndFoundItem />
      </div>
    </div>
  </div>
</template>

<script>
import LostAndFoundItem from "@/components/LostAndFoundItem/"
export default {
  name: "LostAndFound",
  components: {
    LostAndFoundItem
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
    //之后height记得删掉
    // height: 1500px;

    .main {
      flex: 1;
      margin:0 @normal-padding;
      // margin-left: 8px;
      min-width: 360px;
      transition: all 0.3s;

      
    }
  }
}
</style>
