import request from 'superagent'
import config from '../../config'
import firebase from 'firebase'

const endpoint = config.endpoint

export const run = url => new Promise((resolve, reject) => {
  firebase.auth().currentUser.getToken()
    .then(token => {
      request.get(endpoint)
        .query({ url })
        .query({ token })
        .end((error, response) => {
          if (error) {
            reject(error)
          } else {
            let data = response.body
            if (data.error) {
              // error
              reject(new Error(data.error))
            } else {
              // success
              resolve(data.result)
            }
          }
        })
    }).catch(error => {
      reject(error)
    })
})

export const pattern = /facebook\.com/i

export default { pattern, run }
