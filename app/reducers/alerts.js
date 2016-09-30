const alerts = (state = [], action) => {
  switch (action.type) {

    case 'ADD_ALERT':
      let alert = {
        message: action.message,
        url: action.url,
        style: action.style,
        data: action.data
      }
      return [...state, alert]

    case 'CLEAR_ALERT':
      return []

    default:
      return state
  }
}

export default alerts
