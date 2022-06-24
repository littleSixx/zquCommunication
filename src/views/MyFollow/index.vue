<template>
  <div class="my-follow">
    <div class="user-item">
      <UserItem :authorInfo="activeAuthorInfo" />
    </div>
    <div class="user-item">
      <UserItem :authorInfo="activeAuthorInfo" />
    </div>
    <div class="user-item">
      <UserItem :authorInfo="activeAuthorInfo" />
    </div>
    <div class="user-item">
      <UserItem :authorInfo="activeAuthorInfo" />
    </div>
    <div class="user-item">
      <UserItem :authorInfo="activeAuthorInfo" />
    </div>
    <div class="user-item">
      <UserItem :authorInfo="activeAuthorInfo" />
    </div>
    <!-- i标签用于占位 -->
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</template>

<script>
import UserItem from "@/components/UserProfileView/";
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
  created() {
    this.$store.dispatch("changeChoosedNav", 2); //进入该页面后，改变vuex中已选中的导航
  },
};
</script>

<style lang="less" scoped>
@item-width: 238px;
.my-follow {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  // height: 1500px;
  padding: @normal-padding*3 0;
  margin-left: @normal-padding;
  border-radius: @normal-radius;
  margin-top: 3px;
  background: rgba(255, 255, 255, 0.85);

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
</style>
