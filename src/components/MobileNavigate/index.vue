<template>
  <div class="mobile-navigate">
    <i class="el-icon-s-unfold" @click="handleNavDrawer"></i>
    <div class="search-input">
      <el-input
        style="el-input"
        size="small"
        clearable
        placeholder="请输入内容"
        v-model="searchContent"
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

    <!--抽屉 -->
    <el-drawer
      class="nav-drawer"
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      append-to-body
      direction="ttb"
      size="330px"
    >
      <!-- <span>我来啦!</span> -->
      <nav class="nav-content">
        <NavItem
          :navName="navName"
          @click.native="changeTracker"
          :choosedIndex="choosedIndex"
          pathTo="/index"
          :navIndex="0"
          ><a slot="nav-item-content"
            ><i class="iconfont icon-fly"></i>首 页</a
          ></NavItem
        >
        <NavItem
          :navName="navName"
          @click.native="changeTracker"
          :choosedIndex="choosedIndex"
          pathTo="/lost-and-found"
          :navIndex="1"
          ><a slot="nav-item-content"
            ><i class="iconfont icon-find"></i>失物招领</a
          ></NavItem
        >
        <NavItem
          :navName="navName"
          @click.native="changeTracker"
          :choosedIndex="choosedIndex"
          :navIndex="2"
          ><a slot="nav-item-content"
            ><i class="iconfont icon-icon_followed"></i>我的关注</a
          ></NavItem
        >
        <NavItem
          :navName="navName"
          @click.native="changeTracker"
          :choosedIndex="choosedIndex"
          :navIndex="3"
          ><a slot="nav-item-content"
            ><i class="iconfont icon-home"></i>我的信息</a
          ></NavItem
        >
        <div class="tracker" ref="tracker"></div>
      </nav>

      <!-- 我要发布item -->
      <div class="i-post-container">
        <div class="i-post" @click="iPostBtnClick">
          <div class="i-post-item">
            <span for="i-post-input">
              <!-- 用于实现选中更改样式功能 -->
              <i class="iconfont icon-post"></i>我要发布
            </span>
          </div>
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
        <div class="radio-container">
          <el-radio-group v-model="radio">
            <el-radio :label="0">帖子</el-radio>
            <el-radio :label="1">失物招领</el-radio>
          </el-radio-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfirmBtnClick">确 定</el-button>
        </span>
      </el-dialog>
    </el-drawer>
    <!-- 选择发布类型弹出框 -->
  </div>
</template>

<script>
import NavItem from "../Navigate/NavItem/";
import { mapState } from "vuex";
export default {
  name: "MobileNavigate",
  components: {
    NavItem,
  },
  data() {
    return {
      searchContent: "",
      select: 1,
      drawer: false,
      navName: "mobileNav",
      //
      dialogVisible: false,
      radio: 0,
    };
  },
  mounted() {
    // this.changeTracker(); //网页刷新后通过获取本地存储恢复定位
  },
  methods: {
    handleNavDrawer() {
      this.drawer = true;
      this.$nextTick(() => {
        this.changeTracker();
      }); //当点击弹出导航栏时，tracker进行移动
    },
    changeTracker() {
      //用于导航栏圆角边框背景的移动
      this.$refs.tracker.style.top = 20 + this.choosedIndex * 60 + "px";
    },
    iPostBtnClick() {
      this.dialogVisible = !this.dialogVisible;
    },
    comfirmBtnClick() {
      this.dialogVisible = false; //关闭对话框
      this.radio === 0
        ? this.$router.push("/post-edit")
        : this.$router.push("/lost-and-found/edit");
      // this.$store.dispatch("changeChoosedNav", -1);
    },
  },
  computed: mapState({
    choosedIndex: (state) => state.choosedNav,
  }),
};
</script>

<style lang="less" scoped>
.mobile-navigate {
  display: none;
  width: 100vw;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  @media (max-width: @mobile-max-width) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 999;
  }

  i {
    // float: left;
    position: absolute;
    left: @normal-padding;
    font-size: 26px;
    cursor: pointer;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    // background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    // background-image: linear-gradient(to top, #c471f5 0%, #fa71cd 100%);
    // background-image: linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%);
  }

  .el-input {
    width: 240px;
  }
}
.nav-content {
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

  .input:checked + .nav-item-content a {
    color: #ffffff;
  }
}
.i-post-container {
  display: flex;
  justify-content: center;

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
        display: inline-block;
        font-size: 20px;
        letter-spacing: 2px;
        cursor: pointer;
        .iconfont {
          font-size: 20px;
        }
        .input {
          display: none;
        }
      }
    }
  }
}
.radio-container {
  display: flex;
  justify-content: center;
}
</style>
