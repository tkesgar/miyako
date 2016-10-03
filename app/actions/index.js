/**
   ADD_IMAGE
   Adds a new image to list.
   Currently does not check whether image already exists.

   id      Unique identifier for the image.
           Using actual URL from user is good idea.
   src     Image source URL.
   name    Image name.
 */
export const addImage = (id, src, name) => ({
  type: 'ADD_IMAGE',
  id,
  src,
  name
})

/**
   REMOVE_IMAGE
   Removes an image with given identifier from list.
   Currently does not check whether image exists.

   id    Unique identifier for the image to be deleted.
 */
export const removeImage = (id) => ({
  type: 'REMOVE_IMAGE',
  id
})

/**
   ADD_ALERT
   Adds an alert message to alert list.

   url        URL involved in alert.
   message    String that stores the message.
   state      Contextual state.
*/
export const addAlert = (url, message, state = 'info') => ({
  type: 'ADD_ALERT',
  url,
  message,
  state
})

/**
   CLEAR_ALERT
   Completely clears the alert list.
 */
export const clearAlert = () => ({
  type: 'CLEAR_ALERT'
})
