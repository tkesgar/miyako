import React from 'react'
import { Link } from 'react-router'
import NavbarLogin from '../containers/NavbarLogin'

export default () => (
  <nav className="navbar navbar-default navbar-static-top">
    <div className="container">

      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link className="navbar-brand" to="/">Miyako</Link>
      </div>

      <div className="collapse navbar-collapse" id="navbar">
        <ul className="nav navbar-nav">
          <li><a href="https://github.com/tkesgar/miyako" target="_blank">View on GitHub</a></li>
        </ul>
        <NavbarLogin />
      </div>

    </div>
  </nav>
)
