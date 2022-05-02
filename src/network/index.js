import request from "@/network/request.js"

export const reqIndexPostItem = (pageSize, pageNum) => request({
  url: `/comment/${pageSize}/${pageNum}`,
  method: "get"
})

export const reqUserRegister = (registerData) => request({
  url: `/user`,
  method: "post",
  data: registerData
})