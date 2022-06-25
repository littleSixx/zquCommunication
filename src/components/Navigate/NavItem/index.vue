<template>
  <label class="nav-item" @click="handlePathTo" :for="inputId" ref="navItem">
    <!-- 用于实现选中更改样式功能 -->
    <input
      class="input"
      :id="inputId"
      name="nav"
      type="radio"
      :value="this.navIndex"
      :ref="'nav' + navIndex"
    />
    <div
      class="nav-item-content"
      :class="{ 'nav-item-content-hover': choosedIndex !== navIndex }"
      ref="navItemContent"
    >
      <slot name="nav-item-content"></slot>
    </div>
  </label>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NavItem",
  props: {
    navName: {
      type: String,
      required: true,
    },
    pathTo: {
      type: String,
      default: "/index",
    },
    navIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.handleTransition();
  },
  methods: {
    handlePathTo() {
      //点击导航，路由跳转
      this.$router.push(this.pathTo);
      // this.$store.dispatch("changeChoosedNav", this.navIndex);
    },
    handleTransition() {
      //用于选中后文字颜色改变
      if (this.navIndex === this.choosedIndex) {
        //当前item的index等于选中的index时，即当前item被选中时，文字颜色改变
        let itemRef = "nav" + this.navIndex;
        this.$refs[itemRef].checked = true;
      }
    },
  },
  computed: mapState({
    choosedIndex: (state) => state.navigate.choosedNav,
    inputId() {
      //inputId用于给input设置id，防止多个导航栏的input的id重复问题
      return this.navIndex + this.navName;
    },
    loginUserData: (state) => state.user.loginUserData,
  }),
  watch: {
    choosedIndex: {
      //监听当前选择的导航，导航改变时也改变文字的颜色
      immediate: true, //加上了浏览器回退文字不会自动变色，为什么呢？
      handler() {
        this.$nextTick(() => {
          this.handleTransition();
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.nav-item {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 100%;
  padding: 0 20%;
  margin: 15px 0;
  letter-spacing: 2px;
  cursor: pointer;
  z-index: 2;

  .input {
    height: 0;
    width: 0;
    display: none;
  }
  .input:checked + .nav-item-content a {
    color: #ffffff;
  }

  .nav-item-content-hover:hover {
    //当没有选中当前item时,添加鼠标hover背景颜色改变
    background: rgba(0, 0, 0, 0.08);
  }
  .nav-item-content {
    display: inline-block;
    width: 100%;
    height: 35px;
    padding: 2px;
    text-align: center;
    border-radius: 35px;
    background: transparent;
    transition: all 0.3s;
    // background-color: antiquewhite;

    a {
      // color: #f60;
      color: #0c7ed9;
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
      transition: all 0.3s ease-in-out;

      .iconfont {
        font-size: 20px;
      }
    }
  }
}
</style>
