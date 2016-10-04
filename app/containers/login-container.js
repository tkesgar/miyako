import { connect } from 'react-redux'
import { addLogin } from '../actions'
import firebase from 'firebase'
import Login from '../components/login'

const mapStateToProps = (state) => ({
  login: state.login
})

const mapDispatchToProps = (dispatch) => ({
  onLogin: () => {
    let provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider).then(result => {
      dispatch(addLogin(result.user))
    }).catch(error => {
      console.log(error)
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
