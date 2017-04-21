export default (state = false, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return true

    case 'LOADING_FINISH':
      return false

    default:
      return state
  }
}
