import { combineReducers } from 'redux'

import images from './images'
import values from './values'
import alert from './alert'
import user from './user'

export default combineReducers({
  values,
  images,
  alert,
  user
})
