const request = require('superagent')

const APP_ID = process.env.FACEBOOK_APP_ID
const APP_SECRET = process.env.FACEBOOK_APP_SECRET

const TOKEN = `${APP_ID}|${APP_SECRET}`

const ENDPOINT = 'https://graph.facebook.com/v2.7/'

const STEP = 100

const ID_PATTERNS = [
  /album_id=(\d*)/i,
  /\/photos\/.*\/(.*)\/\?/i,
  /\?set=a.(\d+)/i
]

const findId = (url) => {
  let match, id, i = 0
  while (!match && i < ID_PATTERNS.length) {
    let pattern = ID_PATTERNS[i]
    match = pattern.exec(url)
    i++
  }
  // match: Array || null
  return match ? match[1] : null
}

const fb = (id, fields = null, data = {}, errorCallback, callback) => {
  return request.get(`${ENDPOINT}${id}`)
    .query({ access_token : TOKEN })
    .query(fields ? { fields } : {})
    .query(data)
    .end((error, result) => {
      if (error) {
        errorCallback(error)
      } else {
        // result.body = {} -- bug in superagent?
        callback(JSON.parse(result.text))
      }
    })
}

const run = (url, callback) => {
  const err = (error) => callback(false, error)

  let id = findId(url)
  if (!id) {
    callback(false, 'Facebook URL not supported')
  }

  fb(id, null, { metadata: 1 }, err, data => {
    let type = data.metadata.type
    switch (type) {
      case 'album':
        const getAlbumData = (photos, offset = 0) => photos.map((photo, i) => ({
          name: `${id}_${offset + i}`,
          src: photo.images[0].source
        }))

        const fbAlbum_R = (count, results, offset) => {
          if (offset >= count) {
            callback(true, results)
          } else {
            let fields = `photos.offset(${offset}).limit(${STEP}){images{source}}`
            fb(id, fields, null, err, data => {
              let photos = data.photos.data
              fbAlbum_R(count, [...results, ...getAlbumData(photos, offset)], offset + STEP)
            })
          }
        }

        let fields = `photos.limit(${STEP}){images{source}},photo_count`
        fb(id, fields, null, err, data => {
          let count = data.photo_count
          let photos = data.photos.data
          fbAlbum_R(count, getAlbumData(photos), STEP)
        })
        break
      case 'photo':
        fb(id, 'images{source}', null, err, data => {
          let name = id
          let src = data.images[0].source
          callback(true, { name, src })
        })
        break
      default:
        callback(false, 'Facebook URL not supported')
        break
    }
  })
}

const pattern = /facebook\.com/i

exports.pattern = pattern
exports.run = run
module.exports = { pattern, run }
