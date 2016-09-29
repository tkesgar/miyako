const image = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return {
        url: action.url,
        src: action.src || action.url,
        name: action.name
      }
    default:
      return state
  }
}

const images = (state = [], action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return [...state, image(undefined, action)]
    case 'REMOVE_IMAGE':
      return state.filter((x) => { x.url != action.url })
    default:
      return state
  }
}

export default images
