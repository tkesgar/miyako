import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import $ from 'jquery'

import store from 'store'
import { userInit, userLogin, userLogout } from 'actions'
import App from 'components/app'

// Render the app.
render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('app'))
