<template>
  <div class="user-action">
    <Register />
  </div>
</template>

<script>
import Register from "./Register/";
// import Login from "./Login/";
export default {
  name: "UserAction",
  components: {
    Register,
    // Login,
  },
};
</script>

<style scoped>
.user-action {
  display: flex;
  justify-content: center;
  align-items: center;


}
</style>
