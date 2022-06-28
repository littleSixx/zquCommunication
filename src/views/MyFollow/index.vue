<template>
  <div class="my-follow">
    <h1 class="follow-text">我的关注</h1>
    <div class="follow-container">
      <div class="user-item" v-for="followItem in allFollow" :key="followItem.uid">
        <UserItem :authorInfo="followItem" />
      </div>
      <!-- i标签用于占位 -->
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>

<!--    <div class="user-item">-->
<!--      <UserItem :authorInfo="activeAuthorInfo" />-->
<!--    </div>-->
<!--    <div class="user-item">-->
<!--      <UserItem :authorInfo="activeAuthorInfo" />-->
<!--    </div>-->
<!--    <div class="user-item">-->
<!--      <UserItem :authorInfo="activeAuthorInfo" />-->
<!--    </div>-->
<!--    <div class="user-item">-->
<!--      <UserItem :authorInfo="activeAuthorInfo" />-->
<!--    </div>-->
<!--    <div class="user-item">-->
<!--      <UserItem :authorInfo="activeAuthorInfo" />-->
<!--    </div>-->

  </div>
</template>

<script>
import UserItem from "@/components/UserProfileView/";
import { mapState } from "vuex";

export default {
  name: "MyFollow",
  components: {
    UserItem,
  },
  data() {
    return {
      activeAuthorInfo: {
        authorId: "",
        name: "",
        authorDesc: "",
        isFollow: "",
      },
    };
  },
  computed: {
    ...mapState({
      allFollow: (state) => state.user.allFollow
    })
  },
  created() {
    this.$store.dispatch("changeChoosedNav", 2); //进入该页面后，改变vuex中已选中的导航
    this.$store.dispatch("reqAllFollow");
  },
};
</script>

<style lang="less" scoped>
@item-width: 238px;
.my-follow {
  // height: 1500px;
  padding: @normal-padding*2 @normal-padding*2;
  margin-left: @normal-padding;
  border-radius: @normal-radius;
  margin-top: 3px;
  background: rgba(255, 255, 255, 0.85);

  .follow-text {
    font-size: 24px;
    font-weight: 800;
    color: #303133;
    margin-bottom: 32px;
  }
  .follow-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .user-item {
      flex-shrink: 0;
      width: @item-width;
      padding: 0 @normal-padding;
      margin-bottom: @normal-padding*2;

      &:hover .user-profile-view-container {
        transform: scale(1.05);
        box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.3);
      }
    }

    & > i {
      width: @item-width;
    }
  }

}
</style>
