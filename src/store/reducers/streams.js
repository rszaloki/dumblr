import { STREAM } from '../actions/actionTypes.js'

export default (state = [], action) => {
  switch (action.type) {
    case STREAM.ADD:
      return state.concat(action.stream)
    case STREAM.DELETE:
      return state.filter(item => item !== action.stream)
    default:
      return state
  }
}

