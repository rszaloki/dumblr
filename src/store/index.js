import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import streamListReducers from './streamList/streamListReducers.js'
import streamListDefaults from './streamList/streamListDefaults.js'

export const store = createStore(combineReducers({
  streams: streamListReducers
}), {
  streams: streamListDefaults
}, applyMiddleware(promiseMiddleware()))
