'use strict'

const request = require('superagent')

// Facebook app id and secret from environment variables
const APP_ID = process.env.FACEBOOK_APP_ID
const APP_SECRET = process.env.FACEBOOK_APP_SECRET

// Facebook API access token
const TOKEN = `${APP_ID}|${APP_SECRET}`

// Facebook API endpoint
const ENDPOINT = 'https://graph.facebook.com/v2.7/'

// Facebook API photos limit step (for album downloads)
const STEP = 100

// Facebook ID patterns
const ID_PATTERNS = [
  /album_id=(\d*)/i,
  /\/photos\/.*\/(.*)\/\?/i,
  /\?set=a.(\d+)/i
]

// Find the ID based on URL and available ID_PATTERNS
const findId = url => {
  let match, id, i = 0
  while (!match && i < ID_PATTERNS.length) {
    let pattern = ID_PATTERNS[i]
    match = pattern.exec(url)
    i++
  }
  // match: Array || null
  return match ? match[1] : null
}

// Helper to make API request
const fb = (id, fields, data, errorCallback, callback) => {
  fields = fields || null
  data = data || {}

  request.get(ENDPOINT + id)
    .query({ access_token : TOKEN })
    .query(fields ? { fields } : {})
    .query(data)
    .end((error, result) => {
      if (error) {
        errorCallback(error)
      } else {
        // bug in superagent -- manually parse result.text
        callback(JSON.parse(result.text))
      }
    })
}

// Helper to handle facebook API request error
const fbErr = (error, reject) => {
  let status = error.status
  if (400 <= status && status < 500) {
    reject(new Error('API_REQUEST_FAILED'), error)
  } else {
    reject(new Error('SERVER_ERROR'), error)
  }
}

const run = (url, resolve, reject) => {
  // Error callback helper
  const err = error => fbErr(error, reject)

  // Find URL
  let id = findId(url)
  if (!id)
    reject(new Error('URL_NOT_SUPPORTED'))

  // Create initial request to get metadata
  fb(id, null, { metadata: 1 }, err, data => {
    switch (data.metadata.type) {

      // Facebook URL type: photo album
      case 'album':

        // Helper to extract album data
        const getAlbumImages = (images, offset) => {
          offset = offset || 0
          return images.map((image, i) => ({
            link: image.link,
            name: id,
            src: image.images[0].source
          }))
        }

        // Recursive album requests
        const fbAlbum_R = (count, albumData, result, offset) => {
          if (offset >= count) {
            // Base: return immediately
            resolve(Object.assign({ images: result }, albumData))
          } else {
            // Recurrence: make request for offset
            let fields = `photos.offset(${offset}).limit(${STEP}){images{source},link}`
            fb(id, fields, null, err, data => {
              let images = data.images.data
              let newResult = getAlbumData(images, offset)
              fbAlbum_R(count, [...result, ...newResult], offset + STEP)
            })
          }
        }

        // Make recursive requests
        let fields = `photos.limit(${STEP}){images{source},link,name},link,name,photo_count`
        fb(id, fields, null, err, data => {
          let albumData = {
            type: 'album',
            link: data.link,
            title: data.name
          }
          let count = data.photo_count
          let images = data.photos.data
          fbAlbum_R(count, albumData, getAlbumImages(images), STEP)
        })
        break

      // Facebook URL type: photo
      case 'photo':
        fb(id, 'images{source},link,name', null, err, data => {
          resolve({
            type: 'image',
            link: data.link,
            name: id,
            src: data.images[0].source,
            description: data.name
          })
        })
        break

      // Facebook URL type: unknown
      default:
        reject(new Error('URL_NOT_SUPPORTED'))
        break
    }
  })
}

const pattern = /facebook\.com/i

exports.pattern = pattern
exports.run = run
module.exports = { pattern, run }
