import { connect } from 'react-redux'
import firebase from 'firebase'
import { addLogin } from '../actions'
import Login from '../components/login'

const handleLogin = (dispatch) => () => {
  const provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    let token = result.credential.accessToken
    let user = result.user
    dispatch(addLogin('facebook', { token, user }))
  })
  .catch((error) => {
    console.log(error)
  })
}

const mapStateToProps = (state) => {
  return {
    login: state.logins.facebook
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: handleLogin(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
