<template>
  <div class="nav-item" @click="handlePathTo" ref="navItem">
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
.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 100%;
  padding: 0 20%;
  margin:15px 0;
  letter-spacing: 2px;
  cursor: pointer;

  &:hover .nav-item-content {
    background-image: linear-gradient(to right, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
    background-color: #f0f0f0;
  }

  .nav-item-content {
    display: inline-block;
    width: 100%;
    height: 35px;
    padding: 2px;
    text-align: center;

    background-color: rgba(0, 0, 0, 0);
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #387EE8, #f60) 1;
    clip-path: inset(0 0 round 5px);
    transition: all 1s;

    a {
      // color: #f60;
      color: #0c7ed9;
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
    }
  }
}
</style>
