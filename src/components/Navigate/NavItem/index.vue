<template>
  <div id="nav-item" @click="handlePathTo" ref="navItem">
    <div class="nav-item-content"><slot name="nav-item-content"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    pathTo: {
      default: "/index",
    },
  },
  data() {
    return {};
  },
  methods: {
    handlePathTo() {
      this.$router.push(this.pathTo);
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
#nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 100%;
  padding: 0 23%;
  margin-bottom: 15px;
  cursor: pointer;
  background-color: aqua;

  .nav-item-content {
    display: inline-block;
    width: 100%;
    height: 35px;
    text-align: center;
    border-radius: 30px;
    background-color: brown;

    a {
      font-weight: 600;
      color: #303133;
      line-height: 35px;
    }
  }
}
</style>
