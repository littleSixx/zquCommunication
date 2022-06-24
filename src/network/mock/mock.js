import Mock from "mockjs";
const Random = Mock.Random;
const produceMainPostData = function () {
  let postList = [];
  let count = Random.integer(1, 15);
  for (let i = 0; i < count; i++) {
    let postItem = {
      postId: Random.id(),
      authorId: Random.id(),
      name: Random.cname(),
      authorDesc: Random.cparagraph(1, 3),
      isFollow: Random.boolean(),
      avatar: "/images/default_avatar.png",
      title: Random.ctitle(),
      content: Random.cparagraph(5, 20),
      createTime: Random.datetime(),
      likeValue: Random.integer(0, 999),
      collectValue: Random.integer(0, 500),
      commentValue: Random.integer(0, 99),
    };
    postList.push(postItem);
  }
  return postList;
};
const produceLostAndFoundData = function () {
  let list = [];
  let count = Random.integer(1, 9);
  for (let i = 0; i < count; i++) {
    let item = {
      lostAndFoundId: Random.id(),
      authorId: Random.id(),
      name: Random.cname(),
      avatar: "/images/default_avatar.png",
      findName: Random.ctitle(3, 8),
      findTime: Random.datetime(),
      findSite: Random.city(),
      findNum: Random.integer(1, 10),
      findDesc: Random.cparagraph(1, 10),
    };
    list.push(item);
  }
  return list;
};

Mock.mock("/mock/postItems", "get", produceMainPostData);
Mock.mock("/mock/lostAndFoundItems", "get", produceLostAndFoundData);
Mock.mock("/mock/userInfo", "get", {
  uid: Random.id(),
  name: Random.cname(),
  email: Random.email(),
  birthday: Random.date(),
  gender: Random.integer(0, 1),
  desc: Random.cparagraph(1, 3),
});
