import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import $ from 'jquery'

import store from 'store'
import { userInit, userLogin, userLogout } from 'actions'
import App from 'components/app'

// Read config from __MIYAKO__ string (replaced by Brunch).
const config = JSON.parse('__MIYAKO__')

// Render the app.
render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('app'))

// Get Facebook FB script.
$(() => {
  $.ajaxSetup({ cache: true })
  $.getScript('//connect.facebook.net/en_GB/sdk.js', () => {
    const FB = window.FB

    // Initialize the SDK.
    FB.init({
      appId: config.appId,
      version: config.sdkVersion,
      cookie: true
    })

    // Get user initial status.
    FB.getLoginStatus((response) => {
      store.dispatch(response.status === 'connected'
        ? userLogin(response.authResponse)
        : userInit())
    })

    // Subscribe auth handler to auth events.
    FB.Event.subscribe('auth.login', (response) => {
      store.dispatch(userLogin(response.authResponse))
    })
    FB.Event.subscribe('auth.logout', () => {
      store.dispatch(userLogout())
    })
  })
})
