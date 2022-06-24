<template>
  <div class="user-profile-view-container">
    <div class="user-profile-view-bg"></div>
    <div class="user-profile-view-info">
      <div class="avatar-container">
        <el-avatar class="avatar" src="/images/default_avatar.png"></el-avatar>
      </div>
      <div class="user-profile-view-header">
        <h1 class="nickname">{{ authorInfo.name }}</h1>
      </div>
      <div class="user-profile-view-body">
        <p>{{ authorInfo.authorDesc }}</p>
      </div>
      <div class="user-profile-view-footer">
        <el-button size="mini" v-if="!authorInfo.isFollow">关 注</el-button>
        <el-button size="mini" v-else>取 关</el-button>
        <el-button size="mini">私 信</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfileView",
  props: {
    authorInfo: {
      type: Object,
    },
  },
  // watch: {
  //   authorInfo: {
  //     immediate: true,
  //     handle() {
  //       console.log(authorInfo);
  //     },
  //   },
  // },
};
</script>

<style lang="less" scoped>
.user-profile-view-container {
  width: 100%;
  // height: 100%;
  // background-color: blue;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  .user-profile-view-bg {
    width: 100%;
    //
    aspect-ratio: @user-bg-aspect-ratio;
    background-image: url("/images/default_user_background.jpg");
    background-size: 100%;
    background-position-x: 50%;
    background-position-y: 50%;
    background-repeat: no-repeat;
    //
  }
  .user-profile-view-info {
    width: 100%;
    padding: @normal-padding;

    .avatar-container {
      float: left;
      width: 48px;
      height: 48px;
      .avatar {
        width: 100%;
        height: 100%;
      }
    }

    .user-profile-view-header {
      // float: left;
      height: 40px;
      margin-left: 56px;
      // margin-bottom: @normal-padding;
      // background-color: red;

      .nickname {
        color: #303133;
        font-weight: 600;
        margin: 0;
        margin-top: 8px;
      }
    }

    .user-profile-view-body {
      height: 48px;
      margin-left: 56px;
      margin-bottom: @normal-padding;
      // background-color: red;

      p {
        margin-top: 0;
        font-size: 14px;
      }
    }

    .user-profile-view-footer {
      text-align: center;
      ::v-deep button span {
        font-size: 14px;
        padding: 0 8px;
      }
    }
  }
}
</style>
