<template>
  <div id="app">
    <!-- <HeadBar /> -->
    <div class="wrapper">
      <Navigate />
      <div class="left-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {},
  methods: {},
};
</script>
<style lang="less">
@import "./assets/less/lessGlobal.less";
body {
  // background-image: linear-gradient(to bottom, #fff1eb 0%, #ace0f9 100%);
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;

  #app {
    display: flex;
    justify-content: center;
    .wrapper {
      display: flex;
      justify-content: center;
      .wrapper-base();

      .left-content {
        flex: 1;
      }
    }
  }
}
</style>
