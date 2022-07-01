<template>
  <div class="post-edit">
    <h1 class="title">发布帖子</h1>
    <el-input
      class="title-input"
      v-model="article.aTitle"
      placeholder="请输入标题"
    />
    <div style="">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="wangEditor.editor"
        :defaultConfig="wangEditor.toolbarConfig"
        :mode="wangEditor.mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="wangEditor.html"
        :defaultConfig="wangEditor.editorConfig"
        :mode="wangEditor.mode"
        @onCreated="onCreated"
      />
    </div>
    <button @click="postArticle">提交</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import md5 from "js-md5";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { DomEditor } from "@wangeditor/editor";

export default {
  name: "postEdit",
  components: { Editor, Toolbar },
  data() {
    return {
      wangEditor: {
        editor: null,
        html: "<p>hello</p>",
        toolbarConfig: {
          excludeKeys: [
            "uploadVideo",
            "insertVideo",
            "video",
            "clearStyle",
            "delIndent",
            "fullScreen",
            "indent",
            "through",
            "group-indent",
            "group-video",
            "group-more-style",
          ],
        },
        editorConfig: {
          placeholder: "请输入内容...",
          // // 单个文件的最大体积限制
          // maxFileSize: 10 * 1024 * 1024,
          // // 最多可上传几个文件
          // maxNumberOfFiles: 10,
          // // 选择文件时的类型限制，默认为 ['image/*'] 。
          // allowedFileTypes: ["image/*"],
          // 所有的菜单配置，都要在 MENU_CONF 属性下
          MENU_CONF: {
            // 配置上传图片
            uploadImage: {
              // customUploadImages: this.customUploadImages,
              server: "",
              fieldName: "multipartFile",
              // 单个文件的最大体积限制，默认为 2M
              maxFileSize: 10 * 1024 * 1024,
              // 最多可上传几个文件，默认为 100
              maxNumberOfFiles: 10,
              // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
              allowedFileTypes: ["image/*"],
              // 自定义增加 http  header
              headers: {
                // token: this.loginUserData.token,
                authorization: "",
              },
              // 超时时间，默认为 10 秒
              timeout: 10 * 1000, // 10 秒
              //插入图片后的回调
              onInsertedImage(imageNode) {
                if (imageNode == null) return;
                console.log(imageNode);
                const { src, alt, url, href } = imageNode;
                console.log("inserted image", src, alt, url, href);
                this.uploadImageHistory.push(imageNode.name);
              },
              // 单个文件上传成功之后
              onSuccess(file, res) {
                console.log(`${file.name} 上传成功`, res);
              },
              // 单个文件上传失败
              onFailed(file, res) {
                console.log(`${file.name} 上传失败`, res);
              },
              // 上传错误，或者触发 timeout 超时
              onError(file, err, res) {
                console.log(`${file.name} 上传出错`, err, res);
              },
            },
          },
        },
        mode: "default", // or 'simple'
      },
      article: {
        aTitle: "",
        aContent: "",
      },
      uploadImageHistory: [],
    };
  },
  computed: {
    ...mapState({
      loginUserData: (state) => state.user.loginUserData,
      requestUrl: (state) => state.requestUrl,
    }),
  },
  created() {
    //设置请求所带的token
    this.wangEditor.editorConfig.MENU_CONF.uploadImage.headers.authorization =
      this.loginUserData.token;
    //设置上传图片的url
    this.wangEditor.editorConfig.MENU_CONF.uploadImage.server =
      this.requestUrl + "/user/upload/file?dir=aContent";
  },
  methods: {
    customUploadImages(file, insertFn) {
      // file 即选中的文件
      // 自己实现上传，并得到图片 url alt href
      let name = md5(file.name);
      let suffix = file.type.split("/")[1];
      name = name + "." + suffix;
      uploadFile(name, file).then((res) => {
        if (res.status == 200) {
          // 最后插入图片
          console.log(res);
          insertFn(
            "http://" + res.Location,
            file.name,
            "http://" + res.Location
          );
        } else {
        }
      });
    },
    onCreated(editor) {
      this.wangEditor.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    postArticle() {
      console.log(this.wangEditor.editor.getHtml());
      const toolbar = DomEditor.getToolbar(this.wangEditor.editor);
      // console.log(toolbar.getConfig().toolbarKeys);
      this.article.aContent = this.wangEditor.html;
      this.$store.dispatch("postArticle", this.article);
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    }, 1500);
  },
  beforeDestroy() {
    const editor = this.wangEditor.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style lang="less" scoped>
.post-edit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
  //overflow: scroll;
  padding: @normal-padding*3 @normal-padding*2;
  margin-left: @normal-padding;
  margin-bottom: 50px;
  border-radius: @normal-radius;
  @media (max-width: @mobile-max-width) {
    margin-left: 0;
  }
  margin-top: 3px;
  color: #303133;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 24%), 0 17px 50px 0 rgba(0, 0, 0, 19%);

  .title {
    margin-top: 0px;
    margin-bottom: @normal-padding*3;

    text-align: center;
    color: #606266;
    font-size: 26px;
    font-weight: 600;
  }

  .title-input {
    margin-bottom: @normal-padding;
    font-size: 18px;
  }
}
</style>
