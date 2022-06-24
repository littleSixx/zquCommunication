<template>
  <div class="user-action">
    <Register @switchMode="switchMode" v-if="this.mode === 'register'" />
    <Login @switchMode="switchMode" v-else-if="this.mode === 'login'" />
    <ModifyPwd @switchMode="switchMode" v-else-if="this.mode === 'modifyPwd'" />
  </div>
</template>

<script>
import Register from "./Register/";
import Login from "./Login/";
import ModifyPwd from "./ModifyPwd/";
export default {
  name: "UserAction",
  components: {
    Register,
    Login,
    ModifyPwd
  },
  data() {
    return {
      mode: "login",
    };
  },
  created() {},
  methods: {
    switchMode(mode) {
      this.mode = mode;
    },
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
