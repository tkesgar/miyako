import React from 'react'
import { Link } from 'react-router-dom'

import Auth from 'lib/components/auth'

const Navbar = () => (
  <nav className='navbar navbar-default navbar-static-top'>
    <div className='container'>
      <div className='navbar-header'>
        <button type='button'
          className='navbar-toggle collapsed'
          data-toggle='collapse'
          data-target='#mainNavbar'
          aria-expanded='false'
        >
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar' />
          <span className='icon-bar' />
          <span className='icon-bar' />
        </button>
        <Link to='/' className='navbar-brand'>Miyako</Link>
      </div>

      <div id='mainNavbar' className='collapse navbar-collapse'>
        <ul className='nav navbar-nav'>
          <li><Link to='/help'>Help</Link></li>
          <li><Link to='/policy'>Policy</Link></li>
          <li><a href='https://github.com/tkesgar/miyako' target='_blank'>View on GitHub</a></li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          <Auth login={<li><a href='#!' onClick={() => window.FB.logout()}>Log out</a></li>} />
        </ul>
      </div>

    </div>
  </nav>
)

export default Navbar
