/**
 * Returns the full of an URL (with extension).
 */
export function getFullFilename (url) {
  return url.split('#').shift().split('?').shift().split('/').pop()
}

/**
 * Returns the file name of an URL (without extension).
 */
export function getFilename (url) {
  return getFullFilename(url).split('.').slice(0, -1).join('.')
}

/**
 * Returns the file extension of an URL.
 */
export function getFileExt (url) {
  return getFullFilename(url).split('.').slice(-1).join('')
}

/**
 * Creates an object URL from a JavaScript object (using JSON.stringify).
 */
export function createObjectURL (obj) {
  return window.URL.createObjectURL(new window.Blob(
    [JSON.stringify(obj, null, 2)],
    { type: 'application/json' }
  ))
}
