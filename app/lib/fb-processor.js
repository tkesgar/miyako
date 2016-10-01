import request from 'superagent'
import { getState } from '../main'

const GRAPH_API_URL = 'https://graph.facebook.com/v2.7/'
const STEP = 100
const URL_PATTERNS = [
  /album_id=(\d*)/i,
  /\/photos\/.*\/(.*)\//i
]

const fbProcessor = (url, logger, callback) => {

  // Helper to make request
  const makeRequest = (id, token, data = {}, callback) => {
    let url = `${GRAPH_API_URL}${id}`
    request.get(url)
      .query({ access_token : token })
      .query(data)
      .end((error, result) => {
        if (error) {
          logger(error)
        } else {
          let body = result.body
          callback(body)
        }
      })
  }

  // Helper to make recursive album request
  const makeAlbumRequestRecursive = (id, token, callback, count, urls, offset) => {
    console.log(count, urls, offset)
    if (offset >= count) {
      // Base: nothing left to get, return urls
      callback(urls)
    } else {
      // Recurrence: add new urls, offset + STEP
      let fields = `photos.offset(${offset}).limit(${STEP}){images{source}}`
      makeRequest(id, token, { fields }, (data) => {
        let photos = data.photos.data
        let newUrls = photos.map((photo, index) => ({
          id: `${id}_${offset + index}`,
          src: photo.images[0].source
        }))
        makeAlbumRequestRecursive(id, token, callback, count, [...urls, ...newUrls], offset + STEP)
      })
    }
  }

  let state = getState()

  // Must have access token to make Facebook API requests
  if (!state.logins.facebook) {
    throw { message: 'You are not logged in with Facebook.' }
  }
  let token = state.logins.facebook.token

  // Extract id from URL, try all regex until found
  let match, id, i = 0
  while (!match && i < URL_PATTERNS.length) {
    match = URL_PATTERNS[i].exec(url)
    i++
  }
  if (match) {
    id = match[1]
  } else {
    throw { message: 'Unable to find id; URL is not supported yet' }
  }

  let requestUrl = `${GRAPH_API_URL}${id}`
  makeRequest(id, token, { metadata: 1 }, (data) => {
    let type = data.metadata.type
    switch (type) {
      case 'album':
        let fields = `photos.limit(${STEP}){images{source}},photo_count`
        makeRequest(id, token, { fields }, (data) => {
          let count = data.photo_count
          let photos = data.photos.data
          let urls = photos.map((photo, index) => ({
            id: `${id}_${index}`,
            src: photo.images[0].source
          }))
          // makeAlbumRequestRecursive will immediately callback if offset >= count
          makeAlbumRequestRecursive(id, token, callback, count, urls, STEP)
        })
        break
      case 'photo':
        makeRequest(id, token, { fields: 'images{source}' }, (data) => {
          let src = data.images[0].source
          callback({ id, src })
        })
        break
      default:
        logger({ message: `Unsupported Facebook URL: ${type}` })
        break
    }
  })
}

export default fbProcessor
