/* global describe, it, beforeEach, expect */
import { createStore } from 'redux'
import reducers from '../../src/store/reducers/index.js'
import defaultStore from '../../src/store/defaults/index.js'
import {
  addStream,
  deleteStream,
  selectStream
} from '../../src/store/actions/streams.js'

let store = null

beforeEach(function () {
  store = createStore(reducers, defaultStore)
})

describe('user stream', function () {
  it('should have a store', function () {
    expect(store.getState().streams).toEqual({ selectedStream: null, list: [] })
  })

  it('can add a stream', function () {
    store.dispatch(addStream({ id: 1 }))
    expect(store.getState().streams).toEqual({ selectedStream: null, list: [{ id: 1 }] })
  })

  it('can delete a stream', function () {
    store.dispatch(addStream({ id: 1 }))
    store.dispatch(deleteStream({ id: 1 }))
    expect(store.getState().streams).toEqual({ selectedStream: null, list: [] })
  })

  it('can select an existing stream', function () {
    store.dispatch(addStream({ id: 5 }))
    store.dispatch(addStream({ id: 2 }))
    store.dispatch(addStream({ id: 7 }))
    store.dispatch(selectStream({ id: 2 }))
    expect(store.getState().streams).toEqual({ selectedStream: { id: 2 }, list: [{ id: 5 }, { id: 2 }, { id: 7 }] })
  })

  it('can not overwrite selected with non existent stream', function () {
    store.dispatch(addStream({ id: 5 }))
    store.dispatch(addStream({ id: 2 }))
    store.dispatch(addStream({ id: 7 }))
    store.dispatch(selectStream({ id: 2 }))

    store.dispatch(selectStream({ id: 3 }))
    expect(store.getState().streams).toEqual({ selectedStream: { id: 2 }, list: [{ id: 5 }, { id: 2 }, { id: 7 }] })
  })
})
