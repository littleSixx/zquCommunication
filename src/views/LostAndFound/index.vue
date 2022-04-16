<template>
  <div id="lost-and-found">
    <div class="container">
    <Navigate />
    <div class="main"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LostAndFound"
}
</script>

<style scoped>
#lost-and-found {
  display: flex;
  justify-content: center;
  margin-top: 55px;
}
.container {
  display: flex;
  justify-content: space-between;
  width: 95%;
  height: 1500px;
  background-color:antiquewhite;
}
#navigate {
  position: sticky;
  top: 55px;
}
.main {
  flex: 1;
  margin-left: 8px;
  min-width: 360px;
  background-color: blueviolet;
}
</style>