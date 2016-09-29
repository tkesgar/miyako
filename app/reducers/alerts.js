const alerts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALERT':
      return [...state, {
        style: action.style,
        data: action.data
      }]
    case 'CLEAR_ALERT':
      return []
    default:
      return state
  }
}

export default alerts
