import { combineReducers } from 'redux'

import user from './user'
import message from './message'
import result from './result'
import loading from './loading'
import zip from './zip'

export default combineReducers({
  user,
  message,
  result,
  loading,
  zip
})
