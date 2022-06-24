<template>
  <div class="user-info">
    <div class="left-container">
      <div class="email-container">
        <span class="title">邮 箱：</span><span>{{user.email}}</span>
      </div>
      <div class="birthday-container">
        <span class="title">生 日：</span><span>{{user.birthday}}</span>
      </div>
      <div class="desc-container">
        <span class="title">简 介：</span><span>{{user.desc}}</span>
      </div>
    </div>
    <!-- <el-divider direction="vertical"></el-divider> -->
    <div class="right-container">
      <div class="nickname-container">
        <span class="title">昵 称：</span><span>{{user.name}}</span>
      </div>
      <div class="gender-container">
        <span class="title">性 别：</span><span>{{user.gender === 0 ? "男" : "女"}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.$store.dispatch("changeChoosedUserNav", 0);
    this.$API.reqUserInfo("uid")
    .then(res => {
      if(res.status === 200) {
        this.user = res.data
      }
    })
    .catch(err => {
      console.log(err)
    }) 
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  justify-content: center;

  flex-wrap: nowrap;
  padding: @normal-padding*2;

  .left-container,
  .right-container {
    flex: 1;
    & > div {
      margin-bottom: @normal-padding;
    }

    .title {
      font-weight: 600;
    }
    span {
      color: #606266;
      font-size: 18px;
    }
  }
  .right-container {
    border-left: 2px #909399 dotted;
    padding-left: @normal-padding*2; //这里的padding*2会导致左右宽度不相等，右边稍宽
    margin-left: @normal-padding*2; //由于上面的padding-left导致的问题，使用margin抵消，让边框位置保持居中
  }
}
@media (max-width: @mobile-max-width) {
  .user-info {
    flex-direction: column;

    .right-container {
      padding-left: 0;
      border: none;
      margin-left: 0;
    }
  }
}
</style>
