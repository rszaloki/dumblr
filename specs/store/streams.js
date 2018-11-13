import { createStore } from 'redux'
import reducers from '../../src/store/reducers/index.js'
import defaultStore from '../../src/store/defaults.js'

let store = null;

beforeEach(function() {
  store = createStore(reducers, defaultStore);
})

describe('user stream',function() {
  it('should have a store', function() {
    const state = store.getState()
    expect(state).toEqual({streams:[]})
  })
})