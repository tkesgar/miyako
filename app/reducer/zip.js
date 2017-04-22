export default (state = null, action) => {
  switch (action.type) {
    case 'ZIP_START':
      return {
        progress: 0
      }

    case 'ZIP_PROGRESS':
      return {
        progress: action.progress,
        info: action.info
      }

    case 'ZIP_ERROR':
      return {
        error: action.error
      }

    case 'ZIP_FINISH':
      return {
        progress: 100,
        info: 'ZIP completed.',
        url: action.url
      }

    // If result is changed, then zip must be cleared too.
    // TODO Move zip under result, or make actions can trigger actions.
    case 'RESULT_SET':
    case 'RESULT_CLEAR':
    case 'ZIP_CLEAR':
      return null

    default:
      return state
  }
}
