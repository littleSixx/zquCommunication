<template>
  <div id="app" @resize="handleResize">
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
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.handleResize();
  },
  methods: {
    handleResize() {
      if (document.body.clientWidth <= 728) {
        //728为lessGlobal.less的mobile-max-width
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
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
  }
}
</style>
