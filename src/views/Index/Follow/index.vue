<template>
  <div class="follow">
    <p>我的关注</p>
    <nav class="follow-list">
      <FollowItem />
      <FollowItem />
      <FollowItem />
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

<style lang="less" scoped>
.follow {
  width: 242px;
  height: 500px;
  padding: @normal-padding;
  border-radius: @normal-radius;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.5)
}
</style>