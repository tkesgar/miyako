import { combineReducers } from 'redux'

import images from './images'
import alerts from './alerts'

const reducer = combineReducers({
  images,
  alerts
})

export default reducer
