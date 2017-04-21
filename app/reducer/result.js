export default (state = null, action) => {
  switch (action.type) {
    case 'RESULT_SET':
      return action.result

    case 'RESULT_CLEAR':
      return null

    default:
      return state
  }
}
