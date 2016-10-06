export default (state = null, action) => {
  switch (action.type) {

    case 'ADD_ALERT':
      return {
        url: action.url,
        message: action.message
      }

    case 'CLEAR_ALERT':
      return null

    default:
      return state
  }
}
