/**
  Adds a single image to list.
 */
export const addImage = (id, data) => ({
  type: 'ADD_IMAGE',
  id,
  data
})

/**
  Removes a single image from the list.
 */
export const removeImage = (id) => ({
  type: 'REMOVE_IMAGE',
  id
})

/**
 * Adds an alert message for user.
 */
export const addAlert = (url, message) => ({
  type: 'ADD_ALERT',
  url,
  message
})

/**
 * Clears the alert message.
 */
export const clearAlert = () => ({
  type: 'CLEAR_ALERT'
})

/**
 * Login as user.
 */
export const login = user => ({
  type: 'LOGIN',
  user
})

/**
 * Logout as user.
 */
export const logout = () => ({
  type: 'LOGOUT'
})

/**
 * Sets a key to value.
 */
export const setValue = (key, value) => ({
  type: 'SET_VALUE',
  key,
  value
})
