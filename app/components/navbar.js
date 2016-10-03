import React from 'react'
import { Link } from 'react-router'

const Navbar = () => (
  <nav className="navbar navbar-inverse navbar-static-top">
    <div className="container">

      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#mainNavbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link className="navbar-brand" to="/">Miyako</Link>
      </div>

      <div className="collapse navbar-collapse" id="mainNavbar">
        <ul className="nav navbar-nav">
          <li><Link to="/about">About</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="https://github.com/tkesgar/miyako" target="_blank">View on GitHub</a></li>
        </ul>
      </div>

    </div>
  </nav>
)

export default Navbar
