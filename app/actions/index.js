export const addImage = (url, name, src) => {
  return {
    type: 'ADD_IMAGE',
    url,
    name,
    src
  }
}

export const removeImage = (url) => {
  return {
    type: 'REMOVE_IMAGE',
    url
  }
}

export const addAlert = (style, content) => {
  return {
    type: 'ADD_ALERT',
    style,
    content
  }
}

export const clearAlert = () => {
  return {
    type: 'CLEAR_ALERT'
  }
}
