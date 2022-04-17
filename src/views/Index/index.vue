<template>
  <div id="index">
    <div class="container">
      <Navigate />
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
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
#index {
  display: flex;
  justify-content: center;
  margin-top: 55px;
}
.container {
  display: flex;
  justify-content:space-between;
  max-width: 1420px;
  min-width: 360px;
  width: 95%;
  height: 1500px;
  // background-color: antiquewhite;
}
.main {
  flex: 1;
  margin: 0 8px;
  min-width: 360px;
  background-color: blueviolet;
}
#navigate {
  position: sticky;
  top: 55px;
}
#follow {
  position: sticky;
  top: 55px;
}
</style>
