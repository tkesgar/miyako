export default (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE_SET':
      return {
        status: action.status,
        content: action.content
      }

    // TODO Make actions can trigger actions.
    case 'RESULT_SET':
    case 'RESULT_CLEAR':
    case 'MESSAGE_CLEAR':
      return null

    default:
      return state
  }
}
