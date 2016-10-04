import { combineReducers } from 'redux'

import images from './images'
import alerts from './alerts'
import login from './login'

export default combineReducers({
  images,
  alerts,
  login
})
