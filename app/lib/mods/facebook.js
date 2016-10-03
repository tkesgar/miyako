import request from 'superagent'
import config from '../../config'

const endpoint = config.endpoint

export const run = url => new Promise((resolve, reject) => {
  request.get(endpoint)
    .query({ url })
    .end((error, response) => {
      if (error) {
        reject(error)
      } else {
        resolve(response.body.result)
      }
    })
})

export const pattern = /facebook\.com/i

export default { pattern, run }
