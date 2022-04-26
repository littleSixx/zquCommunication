<template>
  <div class="lost-and-found-item">
    <div class="picture">
      <el-image class="picture-content" :src="url" :fit="fit"></el-image>
    </div>
    <div class="description">
      <h1>校园卡</h1>
      <div class="find-time"><span>发现时间：</span></div>
      <div class="find-site"><span>发现地点：</span></div>
      <div class="find-num"><span>数量：</span></div>
      <div class="find-des"><span>描述：</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LostAndFoundItem",
  data() {
    return {
      url: "./",
      fit: "fill",
    };
  },
};
</script>

<style lang="less" scoped>
.lost-and-found-item {
  display: flex;
  padding: @normal-padding;
  // height: 300px;
  margin-bottom: @normal-padding;
  border-radius: @normal-radius;
  background: rgba(255, 255, 255, 0.75);
  transition: all 0.3s;
  &:hover {
    cursor:pointer;
    background: rgba(255, 255, 255, 0.85);
  }

  .picture {
    padding-right: @normal-padding*2;
    .picture-content {
      width: 200px;
      height: 200px;
      @media (max-width: @pad-max-width) {
        width: 150px;
        height: 150px;
      }
      @media (max-width: @mobile-max-width) {
        width: 110px;
        height: 110px;
      }
    }
  }
  .description {
    flex: 1;
    height: 200px;
    // background: rgba(255, 255, 255, 0.85);

    @media (max-width: @pad-max-width) {
      font-size: 18px;
      height: 150px;
    }
    @media (max-width: @mobile-max-width) {
      font-size: 16px;
      height: 110px;
    }

    h1 {
      margin-top: 0;
      letter-spacing: 2px;
      font-size: 20px;
      font-weight: 600;
      color: #303133;
    }
    .find-time, .find-site, .find-num, .find-des {
      margin-bottom: 5px;
      span {
        display: inline-block;
        width: 80px;
        color: #606266;
        font-weight: 600;
        text-align: right;
        @media (max-width:@pad-max-width) {

        }
      }
    }
  }
}
</style>
