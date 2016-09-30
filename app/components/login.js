import React from 'react'

export const NotLogin = ({ onLogin }) => (
  <div>
    <p>You need to log in in order to download photos and albums on Facebook.</p>
    <button className="btn btn-lg btn-primary" onClick={ onLogin }>
      Login with Facebook
    </button>
  </div>
)

export const LoginInfo = ({ login }) => (
  <div>
    <p>You are logged in as <strong>{ login.user.displayName }</strong>.</p>
  </div>
)

export const Login = ({ login, onLogin }) => (
  <div className="container">
    <h1>Login</h1>
    {
      (!login) ? <NotLogin onLogin={ onLogin } /> : <LoginInfo login={ login } />
    }
  </div>
)

export default Login
