<template>
  <div class="user">
    <div class="user-header">
      <el-button
        class="logout-btn"
        v-show="hoverUserProfileInfo.uid == loginUserData.user.uid"
        @click="logout"
        size="mini"
        type="primary"
        >退出登录</el-button
      >
      <el-button
        class="change-avatar-btn"
        v-show="hoverUserProfileInfo.uid == loginUserData.user.uid"
        @click="changeAvatar"
        size="mini"
        type="primary"
        >更换头像</el-button
      >
      <!-- 更换头像 -->
      <el-dialog
        class="change-avatar-dialog"
        append-to-body
        :center="true"
        width="400px"
        title="更换头像"
        :visible.sync="dialogVisible"
      >
        <div class="upload-container">
          <!-- <el-upload
            :data="{ load: 'aaa' }"
            action="http://10.12.2.100:8080/user/file"
            list-type="picture-card"
            :auto-upload="true"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <img width="100%" :src="dialogImageUrl" alt="" /> -->
          <el-upload
            class="avatar-uploader"
            name="multipartFile"
            :headers="imageUploadHeaders"
            :action="requestUrl + '/user/upload/file?dir=avatar_url'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="handleAvatarError"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-dialog>
      <!--  -->
      <div class="user-head">
        <!-- <div
          class="user-avatar"
          :style="{
            backgroundImage: hoverUserProfileInfo.avatarUrl
              ? `url(${hoverUserProfileInfo.avatarUrl})`
              : '/images/default_user_background.jpg',
          }"
        ></div> -->
        <el-avatar
          class="user-avatar"
          :size="100"
          :src="
            hoverUserProfileInfo.avatarUrl
              ? hoverUserProfileInfo.avatarUrl
              : '/images/default_user_background.jpg'
          "
        ></el-avatar>
        <div class="username">{{ hoverUserProfileInfo.username }}</div>
        <div class="user-desc">
          {{
            hoverUserProfileInfo.userDesc
              ? hoverUserProfileInfo.userDesc
              : "暂无简介"
          }}
        </div>
      </div>
    </div>
    <UserNav />
    <router-view />
    <!-- <div class="fixed-container"> -->
    <el-tooltip content="返回首页" placement="bottom">
      <div class="back-btn" @click="backBtnClick">
        <i class="el-icon-arrow-left"></i>
      </div>
    </el-tooltip>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserNav from "@/components/UserNav/";
export default {
  name: "User",
  components: {
    UserNav,
  },
  data() {
    return {
      user: {},
      dialogVisible: false,
      imageUrl: "",
      imageUploadHeaders: { authorization: "" },
      user: {},
    };
  },
  computed: {
    ...mapState({
      requestUrl: (state) => state.requestUrl,
      loginUserData: (state) => state.user.loginUserData,
      hoverUserProfileInfo: (state) => state.user.hoverUserProfileInfo,
    }),
  },
  created() {
    this.$store.dispatch("changeChoosedNav", 3);
    // this.$bus.$on("userInfo", (user) => {
    //   this.user = user;
    //   this.imageUploadHeaders.authorization = this.loginUserData.token;
    //   this.imageUrl = this.user.avatarUrl;
    // });
    let uid = this.$route.params.uid;
    // this.$API
    //   .findUserInfo(uid)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       this.user = res.data.data;
    //       // this.$bus.$emit("userInfo", this.user);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.$store.dispatch("reqHoverUserProfileInfo", uid);
  },
  methods: {
    handleAvatarError(err, file) {
      this.$message.error("上传失败");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.dialogVisible = false;
      this.$message.success("更换成功");
      //更换头像成功后重新请求数据
      this.$API
        .findUserInfo(this.loginUserData.user.uid)
        .then((res) => {
          if (res.status === 200) {
            this.user = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    backBtnClick() {
      this.$router.push("/index");
    },
    logout() {
      this.$store.commit("CLEARLOGINUSERDATA");
      this.$router.replace("/");
    },
    changeAvatar() {
      this.dialogVisible = true;
    },
  },
  // beforeDestroy() {
  //   this.$store.dispatch("changeChoosedNav", 0);
  // }
};
</script>

<style lang="less" scoped>
.user {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  max-width: @container-max-width;
  min-height: 500px;
  margin-top: 3px;
  background: rgba(255, 255, 255, 0.85);
  // padding: @normal-padding*3 @normal-padding*2;
  margin-left: @normal-padding;
  margin-bottom: 50px;
  border-radius: @normal-radius;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 24%), 0 17px 50px 0 rgba(0, 0, 0, 19%);
  @media (max-width: @pad-max-width) {
    width: 80%;
    margin-left: 0;
  }
  @media (max-width: @mobile-max-width) {
    width: 100%;
    margin-left: 0;
  }

  .user-header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    aspect-ratio: @user-bg-aspect-ratio;
    background-image: url("/images/default_user_background.jpg");
    background-size: 100%;
    background-position-x: 50%;
    background-position-y: 50%;
    background-repeat: no-repeat;

    &::before {
      //背景遮罩层
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .logout-btn,
    .change-avatar-btn {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 16px;
      margin-right: 16px;
      ::v-deep span {
        font-size: 13px;
      }
    }
    .change-avatar-btn {
      margin-top: 60px;
    }
    .change-avatar-dialog {
      .upload-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .user-head {
      display: flex;
      align-items: center;
      flex-direction: column;
      z-index: 2; //防止被遮罩层覆盖

      .user-avatar {
        ::v-deep img {
          width: 100%;
        }
      }
      .username {
        width: 150px;
        font-size: 20px;
        height: 1em;
        text-align: center;
        color: #303133;
        font-weight: 600;
        margin-bottom: @normal-padding;
      }
      .user-desc {
        font-size: 14px;
        width: 250px;
        height: 3em;
        font-weight: 600;
        text-align: center;
        border-radius: @normal-radius;
        color: #606266;
        background: rgba(255, 255, 255, 0.75);
        // background-color: slateblue;
      }
    }
  }

  .fixed-container {
    //用于承载基于user的fixed元素
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100vh;
    background-color: #303133;

    .back-btn {
      position: absolute;
      left: -48px;
      top: 55px;
      width: 36px;
      height: 36px;
      background-color: black;
    }
  }
  .back-btn {
    position: absolute;
    left: @normal-padding;
    top: @normal-padding;
    width: 36px;
    height: 36px;

    // background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    // color: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    i {
      font-size: 36px;
      font-weight: 600;
      cursor: pointer;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    }
  }
}
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader {
  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409eff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
