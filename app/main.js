import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import config from './config'
import reducer from './reducers'

import App, { Home } from './components/app'
import LoginContainer from './containers/login-container'
import About from './components/about'

// Create Redux store
let store
if (config.env === 'development') {
  store = createStore(reducer, window.devToolsExtension && window.devToolsExtension())
} else {
  store = createStore(reducer)
}

// Make store state available for import
export const getState = () => store.getState()

// Render app
render((
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="login" component={ LoginContainer } />
        <Route path="about" component={ About } />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))

// Initialize Firebase
firebase.initializeApp(config.firebase);
