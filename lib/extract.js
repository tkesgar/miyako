'use strict'

const MODS = {
  facebook: require('./mods/facebook')
}

const extract = (url, type) => new Promise((resolve, reject) => {
  // Resolve helper
  const resolveHelper = (result, status) => {
    status = status || 'OK'
    resolve({ status, result })
  }

  // Reject if mod is not found
  let mod = MODS[type]
  if (!mod) {
    reject(new Error('URL_NOT_SUPPORTED'))
  }

  // Reject if cannot match mod pattern
  if (!mod.pattern.test(url)) {
    reject(new Error('URL_NOT_SUPPORTED'))
  }

  // Run mod
  mod.run(url, resolveHelper, reject)
})

module.exports = extract
