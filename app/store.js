import { createStore, applyMiddleware, compose } from 'redux'
import reducer from 'reducer'

// Insert Redux store middlewares here.
const middlewares = []

// Create the Redux store.
const store = (() => {
  // If in localhost then we are in development.
  if (['localhost', '127.0.0.1', ''].indexOf(window.location.hostname) !== -1) {
    // Development: use Redux DevTools extension if available
    let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    return createStore(reducer, compose(applyMiddleware(...middlewares), devTools))
  } else {
    // Production: do not use DevTools
    return createStore(reducer, applyMiddleware(...middlewares))
  }
})()

export default store
