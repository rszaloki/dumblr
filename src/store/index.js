import { createStore } from 'redux'
import reducers from './reducers/index.js'
import defaultStore from './defaults/index.js'

export const store = createStore(reducers, defaultStore)