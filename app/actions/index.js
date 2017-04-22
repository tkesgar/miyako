export const userInit = () => ({
  type: 'USER_LOGOUT'
})

export const userLogin = (user) => ({
  type: 'USER_LOGIN',
  user
})

export const userLogout = () => ({
  type: 'USER_LOGOUT'
})

export const messageSet = (status, content) => ({
  type: 'MESSAGE_SET',
  status,
  content
})

export const messageClear = () => ({
  type: 'MESSAGE_CLEAR'
})

export const resultSet = (result) => ({
  type: 'RESULT_SET',
  result
})

export const resultClear = () => ({
  type: 'RESULT_CLEAR'
})

export const loadingStart = () => ({
  type: 'LOADING_START'
})

export const loadingFinish = () => ({
  type: 'LOADING_FINISH'
})

export const zipStart = () => ({
  type: 'ZIP_START'
})

export const zipProgress = (progress, info) => ({
  type: 'ZIP_PROGRESS',
  progress,
  info
})

export const zipError = (error) => ({
  type: 'ZIP_ERROR',
  error
})

export const zipFinish = (url) => ({
  type: 'ZIP_FINISH',
  url
})

export const zipClear = () => ({
  type: 'ZIP_CLEAR'
})
