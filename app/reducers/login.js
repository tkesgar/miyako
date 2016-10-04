const login = (state = null, action) => {
  switch (action.type) {

    case 'ADD_LOGIN':
      return action.user

    default:
      return state
  }
}

export default login
