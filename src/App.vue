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
        <Navigate v-if="$route.meta.isShowNav"></Navigate>
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
    <!-- 用户鼠标移入头像显示 -->
    <div
      class="user-profile-view"
      ref="UserProfileView"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <UserProfileView />
    </div>
    <!--  -->
  </div>
</template>

<script>
import UserProfileView from "@/components/UserProfileView/";
import UserAction from "@/views/UserAction/";
export default {
  name: "App",
  components: {
    UserAction,
    UserProfileView,
  },
  data() {
    return {
      isMobile: false,
      userActionDialog: true,
      showUserProfileView: false, //记录鼠标是否在头像图片中
      // isUserAction: true
    };
  },
  mounted() {
    // this.handleResize();
    this.$bus.$on("showUserProfileView", (payload) => {
      this.$refs.UserProfileView.style.top = payload.top + 42 + "px";
      this.$refs.UserProfileView.style.left = payload.left + 42 + "px";
      this.$refs.UserProfileView.style.visibility = "visible";
      this.$refs.UserProfileView.style.opacity = 1;
      this.showUserProfileView = true;
    });
    this.$bus.$on("closeUserProfileView", () => {
      this.showUserProfileView = false;
      setTimeout(() => {
        if (this.showUserProfileView == false) {
          this.$refs.UserProfileView.style.visibility = "hidden";
          this.$refs.UserProfileView.style.opacity = 0;
        }
      }, 300);
    });
  },
  methods: {
    //当鼠标移入详情时保持显示
    handleMouseEnter() {
      this.$refs.UserProfileView.style.visibility = "visible";
      this.$refs.UserProfileView.style.opacity = 1;
      this.showUserProfileView = true;
    },
    handleMouseLeave() {
      this.$refs.UserProfileView.style.visibility = "hidden";
      this.$refs.UserProfileView.style.opacity = 0;
      this.showUserProfileView = false;
    }
    // handleMouseEnter() {
    //   console.log(1)
    //   this.$refs.UserProfileView.style.visibility = "visible";
    //   this.$refs.UserProfileView.style.opacity = 1;
    // },
    // handleResize() {
    //   // if (document.body.clientWidth <= 728) {
    //   //   //728为lessGlobal.less的mobile-max-width
    //   //   // console.log(this.refs.userActionDialog);
    //   //   this.isMobile = true;
    //   // } else {
    //   //   // console.log(this.refs.userActionDialog);
    //   //   this.isMobile = false;
    //   // }
    // },
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
        margin-bottom: 50px;
        // overflow: hidden;//若不注释会导致发布帖子界面的阴影被隐藏问题
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

    .user-profile-view {
      visibility: hidden;
      opacity: 0;
      position: fixed;
      width: 350px;
      // height: 300px;//高度让内容自适应吧
      transition: all 0.3s;
      &:hover {
        // visibility: visible !important;
        // background-color: #ace0f9;
      }
    }
  }
}
</style>
