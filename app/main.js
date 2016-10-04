import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import firebase from 'firebase'
import reducer from './reducers'

import App, { Home } from './components/app'
import Login from './containers/login-container'
import { About } from './components/page'
import { addLogin } from './actions'

// environment const
// BRUNCH_ENVIRONMENT will be replaced by environment-brunch
const env = 'BRUNCH_ENVIRONMENT'

// Create Redux store
let store
if (env === 'development') {
  // Development
  store = createStore(reducer, window.devToolsExtension && window.devToolsExtension())
} else {
  // Production
  store = createStore(reducer)
}

// Make store state available for import
export const getState = () => store.getState()

// Render app
render((
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="about" component={ About } />
        <Route path="login" component={ Login } />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))

const firebaseConfig = {
  apiKey: "AIzaSyDApJOhS407dti-RZ0630pJxcNdvt1Yngg",
  authDomain: "miyako-4f2df.firebaseapp.com",
  databaseURL: "https://miyako-4f2df.firebaseio.com",
  storageBucket: "miyako-4f2df.appspot.com",
  messagingSenderId: "543115397544"
}
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch(addLogin(user))
})
