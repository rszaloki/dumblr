/* global describe, it, expect, beforeEach */
import * as ipfsKeys from '../../../src/lib/ipfs/keys.js'
import dummyKey from '../../mocks/dummyKey.js'

describe('ipfs key management', function () {
  beforeEach(async function () {
    const keys = await ipfsKeys.listKey()
    for (let keyName of keys.keys()) {
      if (keyName !== 'self') {
        await ipfsKeys.removeKey(keyName)
      }
    }
  })

  it('should have IPFS on window', function () {
    expect(window.Ipfs).not.toBe(undefined)
  })

  it('should create a new key and delete it', async function () {
    const oldKeys = await ipfsKeys.listKey()
    await ipfsKeys.generateKey('dummy')
    let newKeys = await ipfsKeys.listKey()
    expect(newKeys.size).toEqual(oldKeys.size + 1)

    await ipfsKeys.removeKey('dummy')
    newKeys = await ipfsKeys.listKey()
    expect(newKeys.size).toEqual(oldKeys.size)
  })

  it('should have an empty list of keys', async function () {
    let keys = await ipfsKeys.listKey()
    expect(keys.size).toEqual(1)
  })

  it('should import a key and export it', async function () {
    await ipfsKeys.importKey('newdummy', dummyKey, 'nopass')
    const result = await ipfsKeys.exportKey('newdummy', 'nopass')
    expect(result).toEqual(dummyKey)
  })
})
