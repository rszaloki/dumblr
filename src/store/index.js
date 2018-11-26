import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import streamListReducers from './streamList/streamListReducers.js'
import streamListDefaults from './streamList/streamListDefaults.js'
import streamReducers from './stream/streamReducers.js'
import streamDefaults from './stream/streamDefaults.js'

export default function () {
  return createStore(combineReducers({
    streams: streamListReducers,
    activeStream: streamReducers
  }), {
    streams: streamListDefaults,
    activeStream: streamDefaults
  }, applyMiddleware(promiseMiddleware()))
}
