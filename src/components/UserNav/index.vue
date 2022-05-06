<template>
  <div class="user-nav">
    <div class="user-nav-container">
      <UserNavItem pathTo="/user/info" :navIndex="0"><a slot="nav-content">个人信息</a></UserNavItem>
    </div>
    <div class="user-nav-container">
      <UserNavItem pathTo="/user/post" :navIndex="1"><a slot="nav-content">发布帖子</a></UserNavItem>
    </div>
    <div class="user-nav-container">
      <UserNavItem pathTo="/user/lost-and-found" :navIndex="2"><a slot="nav-content">失物招领</a></UserNavItem>
    </div>
  </div>
</template>

<script>
// import NavItem from "@/components/Navigate/NavItem";
import UserNavItem from "@/components/UserNav/UserNavItem/";
export default {
  name: "UserNav",
  components: {
    UserNavItem,
    // NavItem,
  },
};
</script>

<style lang="less" scoped>
.user-nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 45px;
  margin-bottom: @normal-padding*2;
  // background-color: violet;
  border-radius:0 0 @normal-radius @normal-radius;

  .user-nav-container {
    height: 100%;
    max-width: 160px;
  }
}
</style>
