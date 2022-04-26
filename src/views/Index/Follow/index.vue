<template>
  <div class="follow">
    <p class="follow-me">我的关注</p>
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
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.35);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7);

  .follow-me {
    font-size: 16px;
    color: #303133;
    font-weight: 600;
  }
}
</style>