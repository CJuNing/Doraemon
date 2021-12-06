const { download } = require("../../Doraemon")
const path = require("path")
const resolve = (_path) => path.resolve(__dirname, _path)

const express = require("express")
const bodyParser = require("body-parser") //解析前端传过来的数据的中间件

const fs = require("fs")
const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json({ limit: "1000kb" }))

server.all("*", function (req, res, next) {
  //设为指定的域
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("X-Powered-By", " 3.2.1")
  next()
})

server.listen(8098)

server.post("/save", (req, res) => {
  console.log(req.body, req.query, req.params)
  let { url } = req.body
  let name = url.match("[a-zA-Z0-9_]*.jpg$")[0]
  download(url, resolve("./temp/" + name))
  res.send({
    result: 1,
    data: "save success!",
  })
})

let startTime = new Date()
console.log(
  `${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`
)
