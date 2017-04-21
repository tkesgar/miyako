import { connect } from 'react-redux'

const Auth = ({ user, init = null, notLogin = null, login = null }) => {
  if (user === false) {
    return init
  } else {
    return user ? login : notLogin
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
