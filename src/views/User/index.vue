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
  // beforeDestroy() {
  //   this.$store.dispatch("changeChoosedNav", 0);
  // }
};
</script>

<style lang="less" scoped>
.user {
  // display: flex;
  // justify-content: center;
  height: 1500px;
  // margin-top: 3px;
  background: rgba(255, 255, 255, 0.85);
  // padding: @normal-padding*3 @normal-padding*2;
  margin-left: @normal-padding;
  margin-bottom: 50px;
  border-radius: @normal-radius;
  @media (max-width: @mobile-max-width) {
    margin-left: 0;
  }

  .user-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 3.7;
    background-color: antiquewhite;

    .user-head {
      display: flex;
      // justify-content: center;
      align-items: center;
      flex-direction: column;

      .user-avatar {
        width: 100px;
        height: 100px;
        margin-bottom: @normal-padding;
        border-radius: 50%;
        background-color: violet;
      }
      .username {
        width: 150px;
        font-size: 20px;
        height: 1em;
        text-align: center;
        color: #303133;
        font-weight: 600;
        // background-color: slateblue;
        margin-bottom: @normal-padding;
      }
      .user-desc {
        font-size: 14px;
        width: 250px;
        height: 3em;
        font-weight: 600;
        text-align: center;
        color: #606266;
        background: rgba(255, 255, 255, 0.55);
        // background-color: slateblue;
      }
    }
  }
}
</style>
