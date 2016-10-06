import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'
import Login from '../containers/Login'

const isLogin = path => path.indexOf('/login') != -1

const back = () => window.history.back()

export default ({ location, children }) => (
  <div>
    <Navbar />
    <Login show={ isLogin(location.pathname) } />
    { children }
    <Footer />
  </div>
)
