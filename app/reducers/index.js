import { combineReducers } from 'redux'

import images from './images'
import alerts from './alerts'
import logins from './logins'

const reducer = combineReducers({
  images,
  alerts,
  logins
})

export default reducer
