import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import firebase from 'firebase'

import { login } from './actions'
import config from './config'
import reducer from './reducer'

import App from './components/App'
import Home from './components/Home'

// Redux store middlewares
const middlewares = []

// Create Redux store
let store
if ('BRUNCH_ENVIRONMENT' === 'development') {
  // Development: Use Redux DevTools extension if available
  let devTools = window.devToolsExtension ? window.devToolsExtension() : f => f
  store = createStore(reducer, compose(applyMiddleware(...middlewares), devTools))
} else {
  // Production
  store = createStore(reducer, applyMiddleware(...middlewares))
}

// Render app
render((
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="login" component={ Home } />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))

// Initialize Firebase
firebase.initializeApp(config.firebase)

// Firebase auth
const auth = firebase.auth()

// Subscribe on auth state changes.
// This also means we don't have to dispatch auth actions on login/logout.
auth.onAuthStateChanged(user => {
  if (user) {
    // User is logged in
    store.dispatch(login(user))
  } else {
    // No user
    store.dispatch(logout(user))
  }
})

// Export getState() for import in other modules
export const getState = () => store.getState()

// Export getToken() for getting tokens
export const getToken = callback => {
  if (callback) {
    return auth.getToken().then(callback)
  } else {
    return auth.getToken()
  }
}
