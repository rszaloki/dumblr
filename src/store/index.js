import { createStore, combineReducers } from 'redux'
import streamsReducers from './streams/streamsReducers.js'
import streamsDefaults from './streams/streamsDefaults.js'

export const store = createStore(combineReducers({
  streams: streamsReducers
}), {
  streams: streamsDefaults
})
