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
      <NavItem
        @click.native="changeTracker"
        :choosedIndex="choosedIndex"
        pathTo="/index"
        :navIndex="0"
        ><a slot="nav-item-content"
          ><i class="iconfont icon-fly"></i>首 页</a
        ></NavItem
      >
      <NavItem
        @click.native="changeTracker"
        :choosedIndex="choosedIndex"
        pathTo="/lost-and-found"
        :navIndex="1"
        ><a slot="nav-item-content"
          ><i class="iconfont icon-find"></i>失物招领</a
        ></NavItem
      >
      <NavItem
        @click.native="changeTracker"
        :choosedIndex="choosedIndex"
        :navIndex="2"
        ><a slot="nav-item-content"
          ><i class="iconfont icon-icon_followed"></i>我的关注</a
        ></NavItem
      >
      <NavItem
        @click.native="changeTracker"
        :choosedIndex="choosedIndex"
        :navIndex="3"
        ><a slot="nav-item-content"
          ><i class="iconfont icon-fly"></i>我的信息</a
        ></NavItem
      >

      <div class="tracker" ref="tracker"></div>
    </nav>
    <!-- 我要发布item -->
    <div class="i-post" @click="iPostBtnClick">
      <div class="i-post-item">
        <span><i class="iconfont icon-post"></i>我要发布</span>
      </div>
    </div>
    <!-- 选择发布类型弹出框 -->
    <el-dialog
      :center="true"
      :append-to-body="true"
      title="请选择发布类型"
      :visible.sync="dialogVisible"
      width="320px"
    >
      <el-radio-group v-model="radio">
        <el-radio :label="0">帖子</el-radio>
        <el-radio :label="1">失物招领</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      dialogVisible: false,
      radio: 1
    };
  },
  mounted() {
    this.changeTracker(); //网页刷新后通过获取本地存储恢复定位
  },
  methods: {
    changeTracker() {
      //用于导航栏圆角边框背景的移动
      this.$refs.tracker.style.top = 20 + this.choosedIndex * 60 + "px";
    },
    iPostBtnClick() {
      this.dialogVisible = !this.dialogVisible;
    },
  },
  computed: mapState({
    choosedIndex: (state) => state.choosedNav,
  }),
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
    margin-bottom: calc(@normal-padding*2);
    transition: all 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  .nav-content {
    position: relative;
    border-radius: @normal-radius;
    overflow: hidden; //创建bfc
    // padding: 1px 0;//取消上下margin折叠
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

  .i-post {
    position: relative;
    width: 242px;
    height: 45px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 45px;
    margin-top: calc(@normal-radius*3);
    font-weight: 400;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // z-index: -1;

    .i-post-item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 5px;
      bottom: 0;
      width: 60%;
      height: 35px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 35px;
      // z-index: -1;
      color: #0c7ed9;
      // background-color: #dee4ea;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
      span {
        font-size: 20px;
        letter-spacing: 2px;
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
