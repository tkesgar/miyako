import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { setValue } from '../actions'
import LoginModal from '../components/LoginModal'

const mapStateToProps = state => ({
  user: state.user,
  errorLogin: state.values['ERROR_LOGIN']
})

const mapDispatchToProps = dispatch => ({
  onLogin: () => {
    let provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .catch(error => dispatch(setValue(error)))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
