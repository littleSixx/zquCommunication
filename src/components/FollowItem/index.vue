<template>
  <div class="follow-item" @click="enterUserInfo(followItem.uid)">
    <el-avatar class="avatar" :src="followItem.avatarUrl"></el-avatar>
    <div class="follow-user-info">
      <div class="follow-user-name">{{ followItem.username }}</div>
      <div class="follow-user-intro">
        {{ followItem.userDesc }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FollowItem",
  props: {
    followItem: {},
  },
  created() {},
  methods: {
    handleAvatar() {
      return `url(${this.followItem.avatarUrl})`;
    },
    enterUserInfo(uid) {
      this.$router.push({
        name: "Info",
        params: {
          uid: uid,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.follow-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  padding: @normal-padding;
  margin: @normal-padding 0;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  // background: rgba(25, 25, 255, 0.1);

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  .avatar {
    ::v-deep img {
      width: 100%;
    }
  }
  .follow-user-info {
    width: calc(100% - 40px);
    height: 45px;
    padding-left: 10px;

    .follow-user-name {
      font-size: 14px;
      line-height: 25px;
      font-weight: 600;
      .singal-line-overflow-ellipsis();
    }

    .follow-user-intro {
      font-size: 12px;
      //溢出省略号
      .singal-line-overflow-ellipsis();
      //
    }
  }
}
</style>
