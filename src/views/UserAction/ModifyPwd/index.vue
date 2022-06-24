<template>
  <div class="register">
    <!-- 表单 -->
    <h1 class="title">修改密码</h1>
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
      <el-form-item label="电子邮箱：" prop="email">
        <div style="display: flex">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button style="width: 120px; margin-left: 8px"
            >发送验证码</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="邮箱验证码：" prop="emailVerify">
        <el-input v-model="ruleForm.emailVerify"></el-input>
      </el-form-item>
      <div class="btn-container" style="text-align: center">
        <el-button type="primary" style="" @click="registerForm(ruleForm)"
          >注册</el-button
        >
      </div>
      <a class="switch" @click="switchMode('login')">切换到登录</a>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ModifyPwd",
  components: {
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
      },
    };
  },
  methods: {
    registerForm(ruleForm) {
      this.$store.dispatch("userRegister", this.ruleForm);
      console.log(ruleForm);
    },
    switchMode(mode) {
      this.$emit("switchMode", mode);
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
