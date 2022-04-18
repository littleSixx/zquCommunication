<template>
  <label class="nav-item" @click="handlePathTo" :for="navIndex" ref="navItem">
    <!-- 用于实现选中更改样式功能 -->
    <input
      class="input"
      :id="navIndex"
      name="nav"
      type="radio"
      :value="this.navIndex"
      :ref="'nav' + navIndex"
    />
    <div class="nav-item-content" ref="navItemContent">
      <slot name="nav-item-content"></slot>
    </div>
  </label>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    pathTo: {
      type: String,
      default: "/index",
    },
    navIndex: {
      type: Number,
      required: true,
    },
    choosedIndex: {
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
      this.$router.push(this.pathTo);
      this.$store.dispatch("changeChoosedNav", this.navIndex);
    },
    handleTransition() {
      if (this.navIndex === this.choosedIndex) {
        //当前item的index等于选中的index时，即当前item被选中时，文字颜色改变
        let itemRef = "nav" + this.navIndex;
        this.$refs[itemRef].checked = true;
      }
    },
  },
  computed: {},
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

  // &:hover .nav-item-content {
  //   background-image: linear-gradient(to right, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
  //   background-color: #f0f0f0;
  // }
  .input {
    height: 0;
    width: 0;
    // display: none;
  }
  .input:checked + .nav-item-content a {
    color: #ffffff;
  }

  .nav-item-content {
    display: inline-block;
    width: 100%;
    height: 35px;
    padding: 2px;
    text-align: center;
    border-radius: 35px;
    background: transparent;
    // background-color: antiquewhite;

    a {
      // color: #f60;
      color: #0c7ed9;
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>
