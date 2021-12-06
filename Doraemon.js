const Downloader = require("./src/Downloader")
const HtmlReq = require("./src/HtmlReq")

const Doraemon = new Object()

const extend = (target, modules) => {
  for (let key in modules) {
    target[key] = modules[key]
  }
}

const extendProto = (target, modules) => {
  for (let key in modules) {
    target.__proto__[key] = modules[key]
  }
}

extend(Doraemon, Downloader)

extend(Doraemon, HtmlReq)

module.exports = Doraemon
