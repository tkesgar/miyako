import direct from './mods/direct'
import facebook from './mods/facebook'

const mods = {
  direct,
  facebook
}

const extract = url => new Promise((resolve, reject) => {
  // Find mod that is able to process the url
  let names = Object.keys(mods)
  let name = names.find(name => mods[name].pattern.test(url)) || null

  if (name) {
    // Mod found
    let mod = mods[name]
    mod.run(url)
      .then(value => resolve(value))
      .catch(error => reject(error))
  } else {
    // No mods found
    reject(new Error('URL is not supported'))
  }
})

export default extract
