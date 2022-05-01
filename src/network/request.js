import axios from "axios"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: "http://10.12.2.100:8080/",
  timeout: 5000
})

request.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

request.interceptors.response.use((res) => {
  nprogress.done()
  return res
})

export default request