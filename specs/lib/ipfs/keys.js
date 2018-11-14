/* global describe, it, expect */
import * as ipfsKeys from '../../../src/lib/ipfs/keys.js'

describe('ipfs key management', function () {
  it('should have IPFS on window', function () {
    expect(window.Ipfs).not.toBe(undefined)
  })

  it('should list keys', function (done) {
    ipfsKeys.listKey().then(keys => {
      console.log(keys)
      expect(keys).toBe(false)
      done()
    })
  })
})