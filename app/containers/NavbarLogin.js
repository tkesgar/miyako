import React from 'react'
import firebase from 'firebase'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions'

const mapStateToProps = state => ({
  name: state.user ? state.user.displayName : null
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    firebase.auth().signOut()
      .then(() => {
        dispatch(logout())
      })
      .catch(() => {
        // Unable to log out (trapped in app forever MWAHAHA)
        console.log('Failed to log out.')
      })
  }
})

const NavbarLogin = ({ name, onLogout }) => {
  if (!name) {
    // User is not logged in
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">Login</Link></li>
      </ul>
    )
  } else {
    // User is logged in
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><p className="navbar-text">Logged in as {name}</p></li>
        <li><button type="button" className="btn btn-default btn-sm navbar-btn" onClick={onLogout}>Log out</button></li>
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLogin)
