import { combineReducers } from 'redux'

import images from './images'
import alerts from './alerts'
import logins from './logins'

export default combineReducers({
  images,
  alerts,
  logins
})
