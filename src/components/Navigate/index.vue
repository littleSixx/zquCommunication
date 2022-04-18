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
      <NavItem @click.native="changeTracker" :choosedIndex="choosedIndex" pathTo="/index" :navIndex="0"><a slot="nav-item-content">首 页</a></NavItem>
      <NavItem @click.native="changeTracker" :choosedIndex="choosedIndex" pathTo="/lost-and-found" :navIndex="1"
        ><a slot="nav-item-content">失物招领</a></NavItem
      >
      <NavItem @click.native="changeTracker" :choosedIndex="choosedIndex" :navIndex="2"><a slot="nav-item-content">我的关注</a></NavItem>
      <NavItem @click.native="changeTracker" :choosedIndex="choosedIndex" :navIndex="3"><a slot="nav-item-content">我的信息</a></NavItem>
      <div class="tracker" ref="tracker"></div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavItem from "./NavItem/";
export default {
  name: "Navigate",
  components: {
    NavItem,
  },
  data() {
    return {
      input3: "",
      select: "",
    };
  },
  mounted() {
    this.changeTracker()//网页刷新后通过获取本地存储恢复定位
  },
  methods: {
    changeTracker() {//用于导航栏圆角边框背景的移动
      this.$refs.tracker.style.top = 20 + this.choosedIndex*60 + "px";
    }
  },
  computed: mapState({
    choosedIndex: (state) => state.choosedNav
  })
};
</script>

<style lang="less" scoped>
@item-gap: 60px;
.navigate {
  width: 242px;
  height: 500px;

  .search-input {
    opacity: 0.65;
    // background-color: rgba(255, 255, 255, 0.65);
    margin-bottom: @normal-padding;
    transition: all 0.2s;

    &:hover {
      opacity: 0.90;
    }
  }

  .nav-content {
    position: relative;
    border-radius: @normal-radius;
    overflow: hidden; //创建bfc
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.35);
    background: rgba(255, 255, 255, 0.7);

    .tracker {
      position: absolute;
      width: 60%;
      height: 35px;
      // top: calc(20px + @item-gap); //20 80 140
      left: 50%;
      transform: translateX(-50%);
      border-radius: 35px;
      z-index: 1;
      background-color: #0c7ed9;
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>
