<template>
  <div class="post-detail-head">
    <div class="post-detail-head-container">
      <div class="left-container">
        <div class="user-info">
          <el-avatar
            :size="40"
            class="avatar"
            :src="detailData.aimgUrl"
          ></el-avatar>
          <p class="user-name">{{ detailData.username }}</p>
        </div>
      </div>
      <div class="right-container">
        <div class="create-time">
          {{ detailData.createTime }}
        </div>
      </div>
    </div>
    <el-divider class="divider"></el-divider>
  </div>
</template>

<script>
export default {
  name: "PostDetailHead",
  props: {
    detailData: {
      require: true,
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.post-detail-head {
  .post-detail-head-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;

    .left-container,
    .right-container {
    }

    .left-container {
      .user-info {
        display: flex;
        align-items: center;

        .avatar {
          ::v-deep img {
            width: 100%;
          }
        }
        .user-name {
          margin-left: 8px;
          font-weight: 800;
        }
      }
    }

    .right-container {
      .create-time {
        font-size: 15px;
        color: #303133;
      }
    }
  }

  .divider {
    margin: @normal-padding 0;
    height: 2px;
    margin-bottom: 24px;
  }
}
</style>
