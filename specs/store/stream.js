/* global describe, it, beforeEach, expect */
import { openStream } from '../../src/store/stream/streamActions.js'
import storeFactory from '../../src/store/index.js'

let store = null

beforeEach(function () {
  store = storeFactory()
})

describe('active stream', function () {
  it('should open', function () {
    store.dispatch(openStream({ id: 1, head: 'multihash', displayName: 'dummy stream' }))
    const state = store.getState()

    expect(state.activeStream).toEqual({
      id: 1,
      head: 'multihash',
      displayName: 'dummy stream',
      isFetching: false,
      isInitializing: false
    })
  })
})
