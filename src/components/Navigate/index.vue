<template>
  <div class="navigate">
    <div class="search-input">
      <el-input
        size="small"
        clearable
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="综合" value="1"></el-option>
          <el-option label="帖子" value="2"></el-option>
          <el-option label="失物招领" value="3"></el-option>
          <el-option label="用户" value="4"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <nav class="nav-content">
      <NavItem pathTo="/index"><a slot="nav-item-content">首 页</a></NavItem>
      <NavItem pathTo="/lost-and-found"
        ><a slot="nav-item-content">失物招领</a></NavItem
      >
      <NavItem><a slot="nav-item-content">我的关注</a></NavItem>
      <NavItem><a slot="nav-item-content">我的信息</a></NavItem>
    </nav>
  </div>
</template>

<script>
import NavItem from "./NavItem/";
export default {
  name: "Navigate",
  components: {
    NavItem,
  },
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      select: "",
    };
  },
};
</script>

<style lang="less" scoped>
.navigate {
  width: 242px;
  height: 500px;

  .search-input {
    margin-bottom: @normal-padding;
  }

  .nav-content {
    border-radius: @normal-radius;
    overflow: hidden;//创建bfc
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    background: rgba(255, 255, 255, 0.5);
  }
}
</style>
