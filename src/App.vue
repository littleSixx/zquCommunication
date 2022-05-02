<template>
  <div id="app" @resize="handleResize()">
    <!-- 主体内容 -->
    <div class="normal-div">
      <el-backtop
        ><i class="el-icon-arrow-up" style="font-weight: 600"></i
      ></el-backtop>
      <!-- <HeadBar /> -->
      <MobileNavigate />
      <div class="wrapper">
        <Navigate />
        <div class="left-content">
          <router-view />
        </div>
      </div>
    </div>

    <!-- 注册/登录 -->
    <el-dialog
      class="user-action-dialog"
      :visible.sync="userActionDialog"
      width="100%"
      top="3vh"
      :close-on-click-modal="false"
    >
      <UserAction />
    </el-dialog>
  </div>
</template>

<script>
import UserAction from "@/views/UserAction/";
export default {
  name: "App",
  components: {
    UserAction,
  },
  data() {
    return {
      isMobile: false,
      userActionDialog: true,
      // isUserAction: true
    };
  },
  mounted() {
    this.handleResize();
  },
  methods: {
    handleResize() {
      // if (document.body.clientWidth <= 728) {
      //   //728为lessGlobal.less的mobile-max-width
      //   // console.log(this.refs.userActionDialog);
      //   this.isMobile = true;
      // } else {
      //   // console.log(this.refs.userActionDialog);
      //   this.isMobile = false;
      // }
    },
  },
};
</script>
<style lang="less">
@import "./assets/less/lessGlobal.less";
@import "/font/iconfont.css";
body {
  // background-image: linear-gradient(to bottom, #fff1eb 0%, #ace0f9 100%);
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;

  #app {
    display: flex;
    justify-content: center;
    .normal-div {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .wrapper {
      display: flex;
      justify-content: center;
      .wrapper-base();
      @media (max-width: @mobile-max-width) {
        margin-top: 50px;
      }

      .left-content {
        flex: 1;
      }
    }

    .mobile-nav {
      position: fixed;
      top: 0;
      left: 0;
    }

    // .user-action {
    //   @media (max-width: @mobile-max-width) {
    //     width: 95%;
    //   }
    //   max-width: 1042px;
    //   height: 1500px;
    //   background: rgba(255, 255, 255, 0.85);
    // }

    .user-action-dialog {
      width: 50%;
      position: fixed;
      left: 0;
      right: 0;
      margin: 0 auto;

      @media (max-width: @pad-max-width) {
        width: 70%;
      }
      @media (max-width: @mobile-max-width) {
        width: 100%;
      }
    }
  }
}
</style>
