const alerts = (state = [], action) => {
  switch (action.type) {

    case 'ADD_ALERT':
      let alert = {
        url: action.url,
        message: action.message,
        state: action.state
      }
      return [...state, alert]

    case 'CLEAR_ALERT':
      return []

    default:
      return state
  }
}

export default alerts
