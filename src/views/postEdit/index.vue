<template>
  <div class="post-edit">
    <h1 class="title">发布帖子</h1>
    <el-input
      class="title-input"
      v-model="article.title"
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
    <button @click="btnClick">提交</button>
  </div>
</template>

<script>
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
          // 单个文件的最大体积限制
          maxFileSize: 10 * 1024 * 1024,
          // 最多可上传几个文件
          maxNumberOfFiles: 10,
          // 选择文件时的类型限制，默认为 ['image/*'] 。
          allowedFileTypes: ["image/*"],
        },
        mode: "default", // or 'simple'
      },
      article: {
        title: "",
      },
    };
  },
  methods: {
    onCreated(editor) {
      this.wangEditor.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    btnClick() {
      console.log(this.wangEditor.editor.getHtml());
      const toolbar = DomEditor.getToolbar(this.wangEditor.editor);
      console.log(toolbar.getConfig().toolbarKeys);
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
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 24%), 0 17px 50px 0 rgba(0, 0, 0, 19%) !important;

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
