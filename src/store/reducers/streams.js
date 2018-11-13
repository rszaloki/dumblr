import streams from '../defaults/streams.js'
import { STREAM } from '../actions/actionTypes.js'

export default (state = streams, action) => {
  const makeNew = update => Object.assign({}, state, update)

  switch (action.type) {
    case STREAM.ADD:
      return makeNew({
        list: state.list.concat(action.stream)
      })
    case STREAM.DELETE:
      return makeNew({
        list: state.list.filter(item => item.id !== action.stream.id)
      })
    case STREAM.SELECT:
      return makeNew({
        selectedStream: state.list.find(item => item.id === action.stream.id) || state.selectedStream
      })
    default:
      return state
  }
}
