<template>
  <div id="index">
    <div class="container">
      <Navigate />
      <Follow />
      <div class="main"></div>
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
};
</script>

<style scoped>
@media screen and (max-width: 1131px) {
  #follow {
    display: none;
  }
  #navigate {
    width: 200px;
  }
  div.main {
    position: absolute;
    right: 0;
    width: calc(100% - 208px);
  }
}
@media screen and (max-width: 690px) {
  #navigate {
    display: none;
  }
  div.main {
    width: 100%;
  }
  div.container {
    width: 100%;
  }
}
#index {
  display: flex;
  justify-content: center;
  margin-top: 55px;
}
.container {
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 1420px;
  min-width: 360px;
  width: 95%;
  height: 1500px;
  background-color: antiquewhite;
}
.main {
  min-width: 360px;
  width: calc(100% - 502px);
  height: 100%;
  background-color: blueviolet;
}
</style>
