<template>
  <div class="follow">
    <p class="follow-me">我的关注</p>
    <nav class="follow-list">
      <div v-if="!loginUserData.token">
        <span>还没有登录</span>
        <a class="click-login" @click="goToLogin">点击此处登录</a>
      </div>
      <div v-else>
        <FollowItem />
        <FollowItem />
        <FollowItem />
        <FollowItem />
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FollowItem from "@/components/FollowItem/";
export default {
  name: "Follow",
  components: {
    FollowItem,
  },
  computed: {
    ...mapState({
      loginUserData: (state) => state.user.loginUserData,
    }),
  },
  methods: {
    goToLogin() {
      this.$bus.$emit("userActionDialog", true);
    },
  },
};
</script>

<style lang="less" scoped>
.follow {
  width: 242px;
  height: 500px;
  padding: @normal-padding;
  border-radius: @normal-radius;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.35);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7);

  .follow-me {
    font-size: 16px;
    color: #303133;
    font-weight: 600;
  }
  .follow-list {
    & span,
    .click-login {
      font-size: 14px;
      font-weight: 600;
      color: #606266;
    }
    .click-login {
      color: #0c7ed9;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        color: #459af0;
      }
    }
  }
}
</style>
