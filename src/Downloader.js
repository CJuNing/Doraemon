const fs = require("fs")
const request = require("request")

class Downloader {
  constructor(options) {
    let { maxThread = 20, header = {} } = options
    this.headers = headers
    this.maxThread = maxThread
    this.curThread = 0
    this.list = []
  }
  setMaxThread(maxThread = 20) {
    this.maxThread = maxThread
  }
  add(url, path) {
    this.list.push({ url, path })
    this._next()
  }
  _next() {
    if (this.curThread <= this.maxThread && this.list.length > 0) {
      this.curThread++
      let { url, path } = this.list.unshift()
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
