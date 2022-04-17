<template>
  <div id="app">
    <HeadBar />
    <router-view />
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
  background-image: linear-gradient(to bottom, #fff1eb 0%, #ace0f9 100%);
  background-attachment: fixed;
}


</style>
