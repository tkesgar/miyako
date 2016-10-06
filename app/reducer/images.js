const image = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_IMAGE':
      let id = action.id
      let data = action.data
      return { id, data }

    default:
      return state
  }
}

const images = (state = [], action) => {
  switch (action.type) {

    case 'ADD_IMAGE':
      return [...state, image(undefined, action)]

    case 'REMOVE_IMAGE':
      return state.filter(x => x.id != action.id)

    default:
      return state
  }
}

export default images
