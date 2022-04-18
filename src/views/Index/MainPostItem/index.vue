<template>
  <div class="main-post-item">
    <div class="author-info">
      <div class="avatar" :style="handleAvatarImage()"></div>
      <div class="author-name">无名氏</div>
      <div class="post-time">2022年4月18日16:16</div>
    </div>
    <div class="post-content">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi nemo
        deserunt vel tenetur fugiat sint expedita blanditiis vero, numquam ea
        iure eum. Vel recusandae dolore officiis laudantium, delectus
        repellendus corrupti? Inventore, ea aut? In esse est consectetur impedit
        ut a quis quo, saepe id nihil mollitia placeat magni perferendis error
        harum nam et cum doloremque eaque optio iusto tempore vitae. Molestiae
        aut aliquid magnam fuga similique eaque eum illo vero, maiores sequi
        voluptates at architecto. Reiciendis veniam corporis tempore, rem rerum
        saepe nihil? Dolorum voluptatem facilis, et tempora ducimus iure. Alias,
        quo voluptate et aliquid neque, animi dolore vero necessitatibus eius,
        perferendis tempore obcaecati! Ipsum veritatis placeat voluptate
        architecto dolores a delectus, nostrum itaque, rem obcaecati corporis
        similique quas distinctio. Explicabo sapiente dicta, accusantium quos ea
        architecto, dolor cupiditate consequatur vel sit maxime. Corrupti quis,
        a molestias quaerat nulla nesciunt? Non adipisci sit architecto
        blanditiis fuga et quidem autem reiciendis!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPostItem",
  props: {
    avatar: {
      type: String,
      default: "/images/default_avatar.png",
    },
  },
  methods: {
    handleAvatarImage() {
      return {
        backgroundImage: `url(${this.avatar})`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.main-post-item {
  width: 100%;
  // height: 400px;
  margin-bottom: @normal-padding;
  padding: 16px;
  border-radius: @normal-radius;
  // background: rgba(255, 255, 255, 0.70);
  background-color: #ffffff;
  opacity: 0.7;
  transition: all 0.2s;

  &:hover {
    // background: rgba(255, 255, 255, 0.85);
    opacity: 0.85;
  }

  .author-info {
    height: 46px;
    // background-color: antiquewhite;

    .avatar {
      float: left;
      width: 42px;
      height: 42px;
      //居中
      margin-top: 23px;
      transform: translateY(-50%);
      //
      color: #222;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .author-name {
      float: left;
      //居中
      margin-top: 23px;
      margin-left: 12px;
      transform: translateY(-50%);
      //
      padding-left: @normal-padding;
      font-weight: 600;
    }

    .post-time {
      float: right;
      //居中
      margin-top: 23px;
      transform: translateY(-50%);
      //
      font-size: 12px;
      padding-left: @normal-padding;
    }
  }

  .post-content {
    margin-top: 20px;
    line-height: 1.3em;
  }
}
</style>
