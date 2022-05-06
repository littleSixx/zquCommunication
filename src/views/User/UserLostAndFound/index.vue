<template>
  <div class="user-lost-and-found">
    <LostAndFoundItem />
    <LostAndFoundItem />
    <LostAndFoundItem />
    <LostAndFoundItem />
  </div>
</template>

<script>
import LostAndFoundItem from "@/components/LostAndFoundItem/";
export default {
  name: "UserLostAndFound",
  components: {
    LostAndFoundItem,
  },
  created() {
    this.$store.dispatch("changeChoosedUserNav", 2);
  },
};
</script>

<style lang="less" scoped>
.user-lost-and-found {
  padding: @normal-padding*2;
}
</style>
