<template>
  <div class="lost-and-found-edit">
    <div class="container">
      <h1 class="title">发布失物招领</h1>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="物品名称：" prop="findName">
          <el-input v-model="ruleForm.findName"></el-input>
        </el-form-item>
        <el-form-item label="发现地点：" prop="findSite">
          <el-input v-model="ruleForm.findSite"></el-input>
        </el-form-item>
        <el-form-item label="发现时间：" required>
          <el-col :span="11">
            <el-form-item prop="findDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.findDate"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="findTime">
              <el-time-picker
                value-format="hh:mm:ss"
                placeholder="选择时间"
                v-model="ruleForm.findTime"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="数量：" prop="findNum">
          <el-input v-model.number="ruleForm.findNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="findDesc">
          <el-input
            v-model="ruleForm.findDesc"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
          ></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="物品图片：" required>
          <el-upload
            :action="requestUrl + '/user/upload/file?dir=tImg'"
            name="multipartFile"
            :headers="imageUploadHeaders"
            list-type="picture-card"
            :auto-upload="true"
            :on-success="handleUploadSuccess"
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
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            size="medium"
            >发布</el-button
          >
          <el-button @click="resetForm(ruleForm)" size="medium">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- el-dialog原本在这里，现在移到了上面去，不知道有没有问题。el-dialog是和图片上传有关的 -->
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "LostAndFoundEdit",
  data() {
    return {
      imgArray: [],
      imgString: "",
      imageUploadHeaders: { authorization: "" },
      //图片上传相关
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      //
      // percentage: 0,
      ruleForm: {
        //表单数据
        findName: "",
        findSite: "",
        findNum: "",
        findDesc: "",
        findDate: "",
        findTime: "",
        img: ""
      },
      rules: {
        //校验规则，每个数组名和标签中prop属性对应
        //具体的校验规则还没写！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        findName: [
          { required: true, message: "请输入物品名称", trigger: "blur" },
          { min: 1, max: 25, message: "长度在 1 到 25 个字符", trigger: "blur" },
        ],
        findSite: [
          { required: true, message: "请输入发现地点", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" },
        ],
        findNum: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur",
          },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
          {
            type: "number",
            message: "输入内容必须为正整数",
            trigger: "blur",
          },
        ],
        findDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        findTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        findDesc: [{ required: true, message: "请填写描述", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({
      requestUrl: (state) => state.requestUrl,
      loginUserData: (state) => state.user.loginUserData,
    }),
  },
  created() {
    this.imageUploadHeaders.authorization = this.loginUserData.token;
  },
  methods: {
    handleUploadSuccess(response) {
      this.imgArray.push(response.data.url);
      this.imgString = this.imgArray.join(",");
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let payload = {
            tName: this.ruleForm.findName,
            tPlace: this.ruleForm.findSite,
            tTime: this.ruleForm.findDate + "T" + this.ruleForm.findTime,
            tNum: this.ruleForm.findNum,
            tImg: this.imgString,
            tDesc: this.ruleForm.findDesc
          }
          this.$store.dispatch("addLostAndFound", payload);
        } else {
          this.$message.error("信息填写错误");
          return false;
        }
      });
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    resetForm(ruleForm) {
      //重置表单数据
      for (let key in ruleForm) {
        ruleForm[key] = "";
      }
      //注意：图片还没有重置
    },
  },
};
</script>

<style lang="less" scoped>
.lost-and-found-edit {
  // width: 100vh;
  display: flex;
  justify-content: center;
  height: 800px;
  padding: @normal-padding*3 @normal-padding*2;
  margin-left: @normal-padding;
  border-radius: @normal-radius;
  margin-top: 3px;
  color: #303133;
  background: rgba(255, 255, 255, 0.85);
  @media (max-width: @mobile-max-width) {
    margin-left: 0;
  }

  .title {
    margin-top: 0px;
    margin-bottom: @normal-padding*3;

    text-align: center;
    color: #606266;
    font-size: 26px;
    font-weight: 600;
  }

  .container {
    .el-progress {
      margin-bottom: 30px;
    }
  }
}
</style>
