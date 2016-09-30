/**
   ADD_IMAGE
   Adds a new image to list.
   Currently does not check whether image already exists.

   id      Unique identifier for the image.
           Using actual URL from user is good idea.
   src     Image source URL.
 */
export const addImage = (id, src) => {
  return {
    type: 'ADD_IMAGE',
    id,
    src
  }
}

/**
   REMOVE_IMAGE
   Removes an image with given identifier from list.
   Currently does not check whether image exists.

   id    Unique identifier for the image to be deleted.
 */
export const removeImage = (id) => {
  return {
    type: 'REMOVE_IMAGE',
    id
  }
}

/**
   ADD_ALERT
   Adds an alert message to alert list.

   message    String that stores the message.
              This allows alert to receive Error.message.
   url        URL involved in alert. (Optional)
   style      Extra style (for contextual state)
   data       Extra data to describe the alert.
 */
export const addAlert = (message, url, style, data) => {
  return {
    type: 'ADD_ALERT',
    message,
    url,
    style,
    data
  }
}

/**
   CLEAR_ALERT
   Completely clears the alert list.
 */
export const clearAlert = () => {
  return {
    type: 'CLEAR_ALERT'
  }
}
