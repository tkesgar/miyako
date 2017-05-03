/**
 * List of URL patterns that contain IDs.
 * ID must be the first match group (match[1]).
 */
const urlPatterns = [
  /facebook\.com\/media\/set\/\?set=a\.(\d+)/i,
  /facebook\.com\/.*?\?tab=album&album_id=(\d+)/i,
  /facebook\.com\/.*\/posts\/(\d+)/i,
  /facebook\.com\/.*\/photos\/.*\/(\d+)\//i
]
// TODO: /facebook\.com\/.*\/posts\/(\d+)/i = singular posts
// Can be extracted but must first get the page ID,
// which is incompatible with current extract flow.

/**
 * Parses the URL for ID and make API requests to get the data.
 */
function extract (url) {
  return new Promise((resolve, reject) => {
    // Get id from URL or reject.
    let id = findID(url)
    if (!id) return reject(new Error(`Cannot parse URL: ${url}`))

    // Get node metadata to check node type.
    api(`/${id}`, { metadata: 1 })
      .then((response) => {
        let type = response.metadata.type
        switch (type) {
          case 'album':
            // Album node.
            return apiAlbum(id)
          case 'photo':
            // Photo node.
            return apiPhoto(id)
          default:
            // Unknown node.
            return reject(new Error(`Unknown API node type: ${type}`))
        }
      })
      // Resolve with result or reject with error.
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

/**
 * Gets the data of an album node.
 */
function apiAlbum (id, images = [], after = null) {
  // Values for after:
  // 1. null: first request
  // 2. false: base
  // 3. cursor (string): next API request
  if (after === false) {
    // Base: get the album information and return the images array.
    return api(`${id}`, { fields: 'from,description' })
      .then((response) => ({
        type: 'album',
        id: id,
        from: response.from,
        description: response.description,
        images: images
      }))
  } else {
    // Recurrence: make API request and check for next.
    let fields = Object.assign(
      { limit: 100, fields: 'from,images,name' },
      after ? { after } : {}
    )
    return api(`${id}/photos`, fields)
      .then((response) => {
        // Concatenate images with new data from API request.
        images = images.concat(response.data.map(r => ({
          id: r.id,
          from: r.from,
          url: r.images[0].source,
          description: r.name
        })))

        // Check if has next paging.
        if (response.paging.next) {
          // Perform next API request.
          return apiAlbum(id, images, response.paging.cursors.after)
        } else {
          // Stop (reach base).
          return apiAlbum(id, images, false)
        }
      })
  }
}

/**
 * Gets the data of a photo node.
 */
function apiPhoto (id) {
  return api(`/${id}`, { fields: 'from,images{source},name' })
    .then((response) => {
      return {
        type: 'photo',
        id: id,
        from: response.from,
        url: response.images[0].source,
        description: response.name
      }
    })
}

/**
 * Returns the ID from the URL, or null if not available.
 */
function findID (url) {
  for (let pattern of urlPatterns) {
    let match = pattern.exec(url)
    if (match) return match[1]
  }
  return null
}

/**
 * Helper function to make API request.
 */
function api (path, params) {
  return new Promise((resolve, reject) => {
    window.FB.api(path, 'get', params, (response) => {
      if (!response) {
        // Request error.
        return reject(new Error(`Failed to make API request`))
      } else if (response.error) {
        // API request error.
        return reject(Object.assign(new Error(), response.error))
      } else {
        // Request successful.
        return resolve(response)
      }
    })
  })
}

export default extract
