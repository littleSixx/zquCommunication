<template>
  <div id="navigate">
    <nav class="nav-content">
      <NavItem pathTo="/index"><a class="choosed" slot="nav-item-content">首 页</a></NavItem>
      <NavItem pathTo="/lost-and-found"><a slot="nav-item-content">失物招领</a></NavItem>
      <NavItem><a slot="nav-item-content">我的关注</a></NavItem>
      <NavItem><a slot="nav-item-content">我的信息</a></NavItem>
    </nav>
  </div>
</template>

<script>
import NavItem from './NavItem/'
export default {
  name: "Navigate",
  components: {
    NavItem
  }
};
</script>

<style lang="less" scoped>
#navigate {
  width: 242px;
  height: 500px;
  border-radius: 4px;
  background-color: violet;
}
.choosed {
  color: #000000;
}
</style>
