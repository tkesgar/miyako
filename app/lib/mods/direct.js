
export const run = url => new Promise((resolve, reject) => {
  let src = url
  let match = /.*\/(.*)\.(jpeg|jpg|png|gif)[\/?#]*.*/i.exec(url)
  let name = match[1]
  resolve({ src, name })
})

export const pattern = /.*\.(jpeg|jpg|png|gif)/i

export default { pattern, run }
