import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import firebase from 'firebase'

import reducer from './reducers'

import App from './components/app'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDApJOhS407dti-RZ0630pJxcNdvt1Yngg",
  authDomain: "miyako-4f2df.firebaseapp.com",
  databaseURL: "https://miyako-4f2df.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "543115397544"
}

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

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))

//firebase.initializeApp(FIREBASE_CONFIG);
