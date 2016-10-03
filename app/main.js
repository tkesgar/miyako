import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import reducer from './reducers'

import App, { Home } from './components/app'
import { About } from './components/page'

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
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))
