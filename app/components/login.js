import React from 'react'

const LoginInfo = ({ login }) => (
  <div>
    <p>You are logged in as <strong>{ login.displayName }</strong>.</p>
  </div>
)

const NotLogin = ({ onLogin }) => (
  <div>
    <p>You are not currently logged in.</p>
    <button className="btn btn-lg btn-primary" onClick={ onLogin }>Login using Facebook</button>
  </div>
)

const Login = ({ login, onLogin }) => (
  <div className="container">
    <h1>Login</h1>
    <p>You need to login in order to extract URLs from Facebook.</p>
    {
      !login ? <NotLogin onLogin={ onLogin } /> : <LoginInfo login={ login } />
    }
  </div>
)

export default Login
