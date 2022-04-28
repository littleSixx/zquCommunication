<template>
  <div class="follow-item">
    <el-avatar class="avatar" :style="handleAvatar()"></el-avatar>
    <div class="follow-user-info">
      <div class="follow-user-name">无名氏</div>
      <div class="follow-user-intro">
        这个人很懒~这个人很懒~这个人很懒~这个人很懒~这个人很懒~这个人很懒~
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FollowItem",
  props: {
    avatar: {
      default: "/images/default_avatar.png",
    },
  },
  methods: {
    handleAvatar() {
      return {
        backgroundImage: `url(${this.avatar})`,
        backgroundSize: "100%",
      };
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
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 50%;
    background-repeat: no-repeat;
  }
  .follow-user-info {
    width: calc(100% - 40px);
    height: 45px;
    padding-left: 10px;
    color: #222;
    // background-color: aquamarine;

    .follow-user-name {
      font-size: 14px;
      line-height: 25px;
      // font-weight: 600;
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
