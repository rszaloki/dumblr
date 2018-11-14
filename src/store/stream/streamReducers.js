import STREAM from './streamActionTypes.js'
import streamDefaults from './streamDefaults.js'
import { PENDING, FULFILLED } from 'redux-promise-middleware'

export default (state = streamDefaults, action) => {
  const makeNew = update => Object.assign({}, state, update)

  switch (action.type) {
    case `${STREAM.INIT}_${PENDING}`:
      return makeNew({
        isInitializing: true
      })
    case `${STREAM.INIT}_${FULFILLED}`:
      return makeNew({
        isInitializing: false,
        id: action.name,
        head: action.value,
        displayName: action.meta.displayName
      })
    case STREAM.ADD_POST:
      break
    default:
      return state
  }
}
