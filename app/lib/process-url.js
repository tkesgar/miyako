const rawProcessor = (url, log, callback) => {
  callback(url)
}

export const processors = {
  RAW: {
    pattern: /.*\.(jpeg|jpg|png|gif)/i,
    processor: rawProcessor
  }
}

const processURL = (url, log, callback) => {

  // Find matching processor from processor dictionary
  let ids = Object.keys(processors)
  let id = ids.find((name) => processors[name].pattern.test(url))

  // Run the processor or throw error (no matching processor)
  if (id) {
    processors[id].processor(url, log, callback)
  } else {
    throw { message: 'URL is not supported' }
  }
}

export default processURL
