<template>
  <div class="user">
    <div class="user-header">
      <div class="user-head">
        <div class="user-avatar"></div>
        <div class="username">little-six</div>
        <div class="user-desc">
          这个人很懒~这个人很懒~这个人很懒~这个人很懒~
        </div>
      </div>
    </div>
    <UserNav />
    <router-view />
    <!-- <div class="fixed-container"> -->
    <el-tooltip content="返回首页" placement="bottom">
      <div class="back-btn" @click="backBtnClick">
        <i class="el-icon-arrow-left"></i>
      </div>
    </el-tooltip>
    <!-- </div> -->
  </div>
</template>

<script>
import UserNav from "@/components/UserNav/";
export default {
  name: "User",
  components: {
    UserNav,
  },
  created() {
    this.$store.dispatch("changeChoosedNav", 3);
  },
  methods: {
    backBtnClick() {
      this.$router.push("/index");
    },
  },
  // beforeDestroy() {
  //   this.$store.dispatch("changeChoosedNav", 0);
  // }
};
</script>

<style lang="less" scoped>
.user {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  max-width: @container-max-width;
  height: 1500px;
  margin-top: 3px;
  background: rgba(255, 255, 255, 0.85);
  // padding: @normal-padding*3 @normal-padding*2;
  margin-left: @normal-padding;
  margin-bottom: 50px;
  border-radius: @normal-radius;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 24%), 0 17px 50px 0 rgba(0, 0, 0, 19%);
  @media (max-width: @pad-max-width) {
    width: 80%;
    margin-left: 0;
  }
  @media (max-width: @mobile-max-width) {
    width: 100%;
    margin-left: 0;
  }

  .user-header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    aspect-ratio: @user-bg-aspect-ratio;
    background-image: url("/images/default_user_background.jpg");
    background-size: 100%;
    background-position-x: 50%;
    background-position-y: 50%;
    background-repeat: no-repeat;

    &::before {//背景遮罩层
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events:none;
      background-color: rgba(0, 0, 0, 0.1);
    }
    .user-head {
      display: flex;
      align-items: center;
      flex-direction: column;
      z-index: 2;//防止被遮罩层覆盖

      .user-avatar {
        width: 100px;
        height: 100px;
        margin-bottom: @normal-padding;
        border-radius: 50%;
        background-image: url("/images/default_avatar.png");
        background-size: 100% 100%;
      }
      .username {
        width: 150px;
        font-size: 20px;
        height: 1em;
        text-align: center;
        color: #303133;
        font-weight: 600;
        margin-bottom: @normal-padding;
      }
      .user-desc {
        font-size: 14px;
        width: 250px;
        height: 3em;
        font-weight: 600;
        text-align: center;
        border-radius: @normal-radius;
        color: #606266;
        background: rgba(255, 255, 255, 0.75);
        // background-color: slateblue;
      }
    }
  }

  .fixed-container {
    //用于承载基于user的fixed元素
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100vh;
    background-color: #303133;

    .back-btn {
      position: absolute;
      left: -48px;
      top: 55px;
      width: 36px;
      height: 36px;
      background-color: black;
    }
  }
  .back-btn {
    position: absolute;
    left: @normal-padding;
    top: @normal-padding;
    width: 36px;
    height: 36px;

    // background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    // color: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    i {
      font-size: 36px;
      font-weight: 600;
      cursor: pointer;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    }
  }
}
</style>
