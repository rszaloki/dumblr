/* global describe, it, expect */
import * as ipfsKeys from '../../../src/lib/ipfs/keys.js'

describe('ipfs key management', function () {
  it('should have IPFS on window', function () {
    expect(window.Ipfs).not.toBe(undefined)
  })

  it('should create a new key and delete it', function (done) {
    let __keys = 0
    ipfsKeys.listKey().then(keys => {
      __keys = keys.length
    }).then(() => ipfsKeys.generateKey('dummy'))
      .then(() => ipfsKeys.listKey())
      .then(keys => {
        expect(keys.length - 1).toEqual(__keys)
      })
      .then(() => ipfsKeys.removeKey('dummy'))
      .then(() => ipfsKeys.listKey())
      .then(keys => {
        expect(keys.length).toEqual(__keys)
        done()
      }).catch(E => done(E))
  })

  it('should list keys', function (done) {
    ipfsKeys.listKey().then(keys => {
      console.log(keys)
      expect(keys.length).not.toEqual(0)
      done()
    })
  })
})
