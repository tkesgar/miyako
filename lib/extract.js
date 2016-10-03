const mods = {
  facebook: require('./mods/facebook'),
  direct: require('./mods/direct')
}

const extract = (url, callback) => {
  // Find mod to process the URL
  let names = Object.keys(mods)
  let name = names.find(name => mods[name].pattern.test(url)) || null

  if (name) {
    // Mod found
    let mod = mods[name]
    mod.run(url, callback)
  } else {
    // No mods found
    callback(false, 'URL is not supported')
  }
}

module.exports = extract
