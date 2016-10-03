const run = (url, callback) => {
  let src = url
  let match = /.*\/(.*)\.(jpeg|jpg|png|gif)[\/?#]*.*/i.exec(url)
  if (match) {
    let name = match[1]
    callback(true, { src, name })
  } else {
    callback(false, 'URL is not supported')
  }
}

const pattern = /.*\.(jpeg|jpg|png|gif)/i

exports.pattern = pattern
exports.run = run
module.exports = { pattern, run }
