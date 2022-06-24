const path = require("path");
module.exports = {
  lintOnSave: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/assets/less/lessGlobal.less")], //引入全局样式变量
    },
  },
};
