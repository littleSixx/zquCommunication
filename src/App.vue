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
<style>
body {
  background-image: linear-gradient(to bottom, #fff1eb 0%, #ace0f9 100%);
  background-attachment: fixed;
}
@media screen and (max-width: 1131px) {
  #follow {
    display: none;
  }
  #navigate {
    width: 200px;
  }
  div.main {
    margin-right: 0;
  }
}
@media screen and (max-width: 690px) {
  #navigate {
    display: none;
  }
  div.container div.main {
    margin: 0 0;
  }
  div.container {
    width: 100% !important;
  }
}
.container {
  max-width: 1420px;
  min-width: 360px;
  width: 95%;
}
</style>
