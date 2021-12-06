const fs = require("fs")
const request = require("request")

class Downloader {
  constructor(options) {
    let {
      maxThread = 20,
      cooldown = 0,
      cooldownTime = 60,
      headers = {},
    } = options
    this.maxThread = maxThread
    this.cooldown = cooldown
    this.cooldownTime = cooldownTime
    this.headers = headers
    this.curThread = 0
    this.count = 0
    this.list = []
    this.cooldownTimer = null
  }
  setMaxThread(maxThread = 20) {
    this.maxThread = maxThread
  }
  add(url, path) {
    this.list.push({ url, path })
    this._next()
  }
  _next() {
    if (this.cooldownTimer) {
      // 有冷却器时候终止所有下载检测行为，保证只有一个冷却器在运行
      return
    } else if (this.cooldown != 0 && this.count % this.cooldown == 0) {
      // 如果设置了冷却器，且下载总量被冷却量整除，则开始计时冷却
      this.cooldownTimer = setTimeout(() => {
        // 冷却完成后，清楚冷却器
        this.cooldownTimer = null
        // 将下载总进程数推满
        while (this.curThread <= this.maxThread && this.list.length > 0) {
          this._next()
        }
      }, this.cooldownTime * 1000)
    } else if (this.curThread <= this.maxThread && this.list.length > 0) {
      let { url, path } = this.list.unshift()
      this.curThread++
      this.count++
      download(url, path, this.headers).finally(() => {
        this.curThread--
        this._next()
      })
    }
  }
}

const downloader = (options) => {
  return new Downloader(options)
}

const download = (url, path, headers = {}) => {
  return new Promise((resolve, reject) => {
    console.log("Try to download", url, path)
    if (fs.existsSync(path)) {
      return reject("Local path existed")
    }
    request(
      {
        url: url,
        encoding: "binary",
        timeout: 6e4,
        headers: headers,
      },
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          fs.writeFile(path, body, "binary", (err) => {
            if (err) {
              reject(`Save file error! ${err} , ${path}, ${url}`)
            } else {
              console.log(`${path} is created successful!`)
              resolve(path)
            }
          })
        } else {
          reject(
            `Network error! ${error || response.statusCode} , ${path}, ${url}`
          )
        }
      }
    )
  })
}

module.exports = { Downloader, downloader, download }
