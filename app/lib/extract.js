import direct from './mods/direct'
import facebook from './mods/facebook'
import { endpoint } from '../config'
import superagent from 'superagent'
import { getState, getToken } from 'main'

// Default server request
const defaultServerRequest = {
  // if true, user must login
  login: false,
  // additional query
  query: {}
}

// Insert modules here, except 'direct' which is used for fallthrough cases.
const MODS = {
  facebook
}

const extract = url => new Promise((resolve, reject) => {
  // helper to wrap result
  const resolveHelper = result => resolve({ type, result })

  // Find mod to process the url
  let names = Object.keys(MODS)
  let name = names.find(name => MODS[name].pattern.test(url)) || null

  // Use the found mod or 'direct' if not found
  let mod = name ? MODS[name] : direct
  let type = name || 'direct'

  if (typeof mod.run === 'object') {
    // mod.run is an object: use requestServer
    requestServer(url, type, mod.run, resolveHelper, reject)
  } else {
    // mod.run is a function
    mod.run(url, resolveHelper, reject)
  }
})

// Runner to request the backend
const requestServer = (url, type, requestConfig, resolve, reject) => {
  // Helper to check request result
  const makeRequest = (request) => {
    request.end((error, response) => {
      if (error) {
        // Request error
        reject(new Error('SERVER_ERROR'))
      } else {
        // Request is successful but result might be negative response
        let data = response.body
        if (data.status === 'OK') {
          resolve(data.result)
        } else {
          reject(data.result)
        }
      }
    })
  }

  // Build config
  let config = Object.assign({}, defaultServerRequest, requestConfig)

  // Make request object
  let request = superagent.get(endpoint)
    .query({ url, type })
    .query(config.query)

  if (config.login) {
    // Reject if requires login but user is not logged in
    let user = getState().user
    if (config.login && !user) {
      reject(new Error('MUST_LOGIN'))
      return
    }

    // Adds the token and sends the request
    getToken()
      .then(token => {
        request.query({ token: token.accessToken })
        makeRequest(request)
      })
      .catch(error => {
        reject(new Error('FIREBASE_ERROR'))
      })
  } else {
    // Sends the request
    makeRequest(request)
  }
}

export default extract
