import request from 'superagent'
import { getState } from '../main'

const GRAPH_API_URL = 'https://graph.facebook.com/v2.7/'

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
        makeRequest(id, token, { fields: 'photos{images{source}}' }, (data) => {
          let photos = data.photos.data
          let urls = photos.map((photo, index) => ({
            id: `${id}_${index}`,
            src: photo.images[0].source
          }))
          callback(urls)
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
