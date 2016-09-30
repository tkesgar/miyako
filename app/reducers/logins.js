const logins = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_LOGIN':
      let provider = action.provider
      let data = action.data
      return Object.assign({}, state, { [provider]: data })

    default:
      return state
  }
}

export default logins
