import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import reducer from './reducers'

import App, { Home } from './components/app'
import LoginContainer from './containers/login-container'
import About from './components/about'

//
// TODO Switch to development or production
//
// Development
// -----------
// const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension())
//
// Production
// ----------
 const store = createStore(reducer)
//

// Make store state available for imports
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
const firebaseConfig = {
  apiKey: 'AIzaSyDApJOhS407dti-RZ0630pJxcNdvt1Yngg',
  authDomain: 'miyako-4f2df.firebaseapp.com',
  databaseURL: 'https://miyako-4f2df.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '543115397544'
}
firebase.initializeApp(firebaseConfig);
