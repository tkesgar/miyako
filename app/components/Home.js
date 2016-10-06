import React from 'react'

import Login from '../containers/Login'
import Input from '../containers/Input'
import Images from '../containers/Images'
import FBImages from '../containers/FBImages'
import FBAlbums from '../containers/FBAlbums'

const isLogin = path => path.indexOf('/login') != -1

export default ({ location }) => (
  <div className="container">
    <Login show={ isLogin(location.pathname) } />
    <Input />
    <Images />
    <FBImages />
    <FBAlbums />
  </div>
)
