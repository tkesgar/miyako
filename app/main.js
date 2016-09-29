import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'

import { Provider } from 'react-redux'

import reducer from './reducers'

import App from './components/app'

const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension())

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'))
