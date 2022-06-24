<template>
  <div class="register">
    <!-- 表单 -->
    <h1 class="title">注册</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
    >
      <el-form-item label="昵称：" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="passwordConfirm">
        <el-input v-model="ruleForm.passwordConfirm" type="password"></el-input>
      </el-form-item>
      <el-form-item label="生日：">
        <el-form-item prop="birthday">
          <el-date-picker
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.birthday"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email">
        <div style="display: flex">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button
            @click="sendEmail(ruleForm.email)"
            style="width: 120px; margin-left: 8px"
            >发送验证码</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="邮箱验证码：" prop="emailVerify">
        <el-input v-model="ruleForm.emailVerify"></el-input>
      </el-form-item>
      <!-- 图片上传 -->
      <!-- <el-form-item label="头像：">
        <el-upload
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
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item> -->

      <!-- <el-form-item> -->
      <div class="btn-container" style="text-align: center">
        <el-button type="primary" style="" @click="registerForm(ruleForm)"
          >注册</el-button
        >
      </div>
      <a class="switch" @click="switchMode('login')">切换到登录</a>
      <!-- </el-form-item> -->
    </el-form>

    <!-- 自己写的input组件，太丑了，可能用不上 -->
    <!-- <el-form :model="form" :rules="rules">
      <el-form-item prop="username">
        <UserInput v-model="form.email" label="电子邮箱" />
      </el-form-item>
      <el-form-item prop="username">
        <UserInput v-model="form.username" label="昵称" />
      </el-form-item>
      <el-form-item prop="username">
        <UserInput v-model="form.password" label="密码" />
      </el-form-item>
      <el-form-item prop="username">
        <UserInput v-model="form.passwordConfirm" label="确认密码" />
      </el-form-item>
      <el-form-item prop="username">
        <UserInput v-model="form.gender" label="性别" />
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
// import UserInput from "@/components/UserInput/";
export default {
  name: "Register",
  components: {
    // UserInput,
  },
  data() {
    const checkEmail = (rule, value, callback) => {
      rule;
      const regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的电子邮箱"));
    };
    const checkPassword = (rule, value, callback) => {
      rule;
      value;
      return this.ruleForm.password === value
        ? callback()
        : callback(new Error("两次密码不一样"));
    };
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      ruleForm: {
        username: "",
        password: "",
        passwordConfirm: "",
        birthday: "",
        gender: 0, //用户可选性别，即为不选择
        email: "",
        emailVerify: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur",
          },
        ],
        passwordConfirm: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" },
        ],
        emailVerify: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" },
        ],
        birthday: [],
        gender: [],
      },
    };
  },
  methods: {
    async registerForm(ruleForm) {
      let result = await this.$store.dispatch("userRegister", ruleForm);
      console.log(result);
      if (result.flag === true) {
        this.$message.success("注册成功，快去登陆吧~");
        this.$emit("switchMode", "login");
      } else {
        this.$message.error("出错了~");
      }
    },
    switchMode(mode) {
      this.$emit("switchMode", mode);
    },
    sendEmail(email) {
      const payload = { email };
      this.$store.dispatch("sendEmail", payload);
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  .title {
    margin-top: -24px;
    margin-bottom: 32px;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
  }

  .btn-container {
    position: relative;
  }
  .switch {
    display: block;
    margin-top: 16px;
    text-align: center;
    color: #98c379;
    cursor: pointer;
  }
}
</style>
