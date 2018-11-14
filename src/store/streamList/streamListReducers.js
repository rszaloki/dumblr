import typeToReducer from 'type-to-reducer'
import streams from './streamListDefaults.js'
import STREAMLIST from './streamListActionTypes.js'

const newState = (state, update) => Object.assign({}, state, update)

export default typeToReducer({
  [STREAMLIST.ADD]: (state, action) => newState(state, {
    list: state.list.concat(action.stream)
  }),
  [STREAMLIST.DELETE]: (state, action) => newState(state, {
    list: state.list.filter(item => item.id !== action.stream.id)
  }),
  [STREAMLIST.SELECT]: (state, action) => newState(state, {
    selectedStream: state.list.find(item => item.id === action.stream.id) || state.selectedStream
  })
}, streams)
