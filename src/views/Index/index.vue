<template>
  <div class="index">
    <div class="container">
      <div class="main"></div>
      <Follow />
    </div>
  </div>
</template>

<script>
import Follow from "@/views/Index/Follow/";
export default {
  name: "Index",
  components: {
    Follow,
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.index {
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
      margin: 0 @normal-padding;
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
