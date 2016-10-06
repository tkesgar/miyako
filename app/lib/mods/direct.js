import request from 'superagent'
import bowser from 'bowser'

export const run = (url, resolve, reject) => {
  // src is the URL itself
  let src = url

  // Try to extract filename from URL
  let filenameMatch = /.*\/(.*\.(jpeg|jpg|png|gif))[\/?#]?/i.exec(url)
  if (filenameMatch) {
    // Filename found; resolve with URL and src
    let name = filenameMatch[1]
    resolve({ src, name })
  } else {
    // Unable to extract filename, try to request the URL
    request.get(url)
      .end((error, response) => {
        if (error) {
          // Failed to make response
          if (bowser.firefox) {
            // Make note for Firefox
            reject(new Error('REQUEST_FAILED_FIREFOX', error))
          } else {
            // Generic message
            reject(new Error('REQUEST_FAILED', error))
          }
        } else {
          // Check if response type is image
          let extMatch = /image\/(.*)/i.exec(response.type)
          if (extMatch) {
            // This is an image
            let file = /.*\/([^\/?#]*)[\/?#]/i.exec(url)[1]
            let ext = extMatch[1] // TODO perhaps needs mime-type mapping
            let name = `${file}.${ext}`
            resolve({ src, name })
          } else {
            // This is not an image
            reject(new Error('FILE_NOT_IMAGE'))
          }
        }
      })
  }
}

// Direct pattern accepts all URLs
export const pattern = /.*/i

export default { pattern, run }
