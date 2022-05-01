import request from "@/network/request.js"

export const reqIndexPostItem = () => request({
  url: "/comment/2/3",
  method: "get"
})