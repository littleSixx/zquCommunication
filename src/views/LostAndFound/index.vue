<template>
  <div class="lost-and-found">
    <div class="container">
      <div class="main">
        <LostAndFoundItem />
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
  },
  created() {
    this.$store.dispatch("changeChoosedNav", 1)
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
      margin:0 @normal-padding;
      min-width: 360px;
      transition: all 0.3s;
    }
  }
}
</style>
