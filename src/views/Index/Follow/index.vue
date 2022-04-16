<template>
  <div id="follow">
    <p>我的关注</p>
    <nav class="follow-list">
      <FollowItem />
    </nav>
  </div>
</template>

<script>
import FollowItem from "@/components/FollowItem/"
export default {
  name: "Follow",
  components: {
    FollowItem
  }
}
</script>

<style scoped>
#follow {
  width: 242px;
  height: 500px;
  padding: 8px;
  border-radius: 4px;
  background-color: violet;
}
</style>