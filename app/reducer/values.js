const values = (state = {}, action) => {
  switch (action.type) {

    case 'SET_VALUE':
      return Object.assign({}, state, { [action.key]: action.value })

    default:
      return state
  }
}

export default values
