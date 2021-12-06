const request = require("request")

const { JSDOM } = require("jsdom")

const htmlReq = (url, options = {}) => {
  options.url = url
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        reject(err || res.statusCode)
      } else {
        resolve({
          string: body,
          document: new JSDOM(body).window.document,
        })
      }
    })
  })
}

module.exports = { htmlReq }
