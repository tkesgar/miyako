export default (state = false, action) => {
  switch (action.type) {
    case 'USER_INIT':
      return null

    case 'USER_LOGIN':
      return action.user

    case 'USER_LOGOUT':
      return null

    default:
      return state
  }
}
