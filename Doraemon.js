const download = require("./src/download")
const html = require("./src/html")

const NetIo = new Object()

// TODO. 名字不明确
NetIo.__proto__.extendsAttr = function (module) {
  for (let key in module) {
    this[key] = module[key]
  }
}

NetIo.extendsAttr(html)
NetIo.extendsAttr(download)

module.exports = NetIo
