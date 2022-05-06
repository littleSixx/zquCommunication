<template>
  <div class="user-nav-item" @click="handlePathTo" :class="{ choosedItem : navIndex === choosedUserNav ? true : false }">
    <slot name="nav-content"></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserNavItem",
  props: {
    pathTo: {
      type: String,
      default: "/user/info",
    },
    navIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handlePathTo() {
      this.$router.push(this.pathTo);
    },
  },
  computed: mapState({
    choosedUserNav: (state) => state.navigate.choosedUserNav,
  }),
};
</script>

<style lang="less" scoped>
.user-nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; //宽高都设为100%，方便父组件控制宽高
  padding: 4px 16px;
  border-bottom: 0px solid #0c7ed9;
  transition: all 0.1s;

  &:hover {
    border-bottom: 4px solid #0c7ed9;
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.1s;
  }
  a {
    color: #303133;
    font-weight: 600;
    letter-spacing: 1px;
  }
}
.choosedItem {
  border-bottom: 4px solid #0c7ed9;
}
</style>
