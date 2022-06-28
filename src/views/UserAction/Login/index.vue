<template>
  <div class="login">
    <!-- 表单 -->
    <h1 class="title">登录</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      :ref="ruleForm"
      label-width="120px"
    >
      <el-form-item label="电子邮箱：" prop="email">
        <div style="display: flex">
          <el-input v-model="ruleForm.email"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <div class="btn-container" style="text-align: center"> -->
        <el-button type="primary" style="" @click="userLogin(ruleForm)"
          >登录</el-button
        >
        <!-- </div> -->
      </el-form-item>
      <div class="switch-container">
        <a class="switch" @click="switchMode('register')">切换到注册</a>
        <a class="switch" @click="switchMode('modifyPwd')">修改密码</a>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
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
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
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
      },
    };
  },
  methods: {
    async userLogin(ruleForm) {
      //前端对表单进行格式验证
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          //前端通过了，再向后端发请求
          const result = await this.$store.dispatch("userLogin", ruleForm);
          if (result.flag === false) {
            this.$message.error(result.msg);
          } else if (result.flag === true) {
            this.$message.success(result.msg);
            //全局事件总线关闭登录的对话框
            this.$bus.$emit("userActionDialog", false);
            //登录成功后重新请求首页的所有帖子（此处为刷新页面）
            this.$router.go(0)
            this.$store.dispatch("reqAllFollow"); //获取该用户关注的所有人
          }
        } else {
          this.$message.error("输入的内容不符合要求");
          return false;
        }
      });
    },
    switchMode(mode) {
      this.$emit("switchMode", mode);
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  .title {
    margin-top: 24px;
    margin-bottom: 32px;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
  }

  .btn-container {
    position: relative;
    margin-top: 50px;
  }
  .switch-container {
    .switch {
      display: block;
      margin-top: 16px;
      text-align: center;
      color: #98c379;
      cursor: pointer;
    }
  }
}
</style>
