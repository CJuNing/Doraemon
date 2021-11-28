const request = require("request")

const { JSDOM } = require("jsdom")

const html = (url, options = {}) => {
  options.url = url
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        reject(err || res.statusCo)
      } else {
        resolve({
          string: body,
          document: new JSDOM(body).window.document,
        })
      }
    })
  })
}

module.exports = { html }
