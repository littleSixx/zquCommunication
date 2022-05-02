<template>
  <div class="user-input">
    <input :type="type" required />
    <div class="underline"></div>
    <label for="">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: "UserInput",
  props: {
    // value: {
    //   type: String,
    //   default: "",
    // },
    type: {
      type: String,
      default: "text",
    },
    label: {},
    size: {
      type: String,
      default: "medium",
    },
  },
};
</script>

<style lang="less" scoped>
.user-input {
  position: relative;
  width: 250px;
  height: 32px;
  margin-bottom: @normal-padding*2;
  input {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    padding: 0;
    outline: none;
    border: none;
    border-bottom: 2px solid #c0c0c0;
    &:focus ~ label,
    &:valid ~ label {
      transform: translateY(-25px);
      font-size: 15px;
      color: #2c6fdb;
    }
  }

  label {
    position: absolute;
    left: 0;
    bottom: 0px;
    color: #808080;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  .underline {
    position: absolute;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: #2c6fdb;
    transform: scale(0);
    transition: all 0.3s ease;
  }
  input:focus ~ .underline,
  input:valid ~ .underline {
    transform: scaleX(1);
  }
}
</style>
