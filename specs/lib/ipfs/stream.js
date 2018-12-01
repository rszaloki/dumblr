/* global describe, it, expect, beforeEach */

import dummyKey from '../../mocks/dummyKey.js'
import { Stream } from '../../../src/lib/ipfs/Stream.js'
import { Post } from '../../../src/lib/ipfs/Post.js'
import { importKey, listKey } from '../../../src/lib/ipfs/keys.js'
import { IPFS } from '../../../src/lib/ipfs/index.js'

describe('stream ', function () {
  beforeEach(async function () {
    const keys = await listKey()
    console.log(`check for dummykey`)
    if (!keys.has('dummykey')) {
      console.log(`don't have dummykey, importing!`)
      await importKey('dummykey', dummyKey, 'nopass')
    }
  })
  it('should create a stream with one post', async function () {
    const ipfs = await IPFS()
    const post = new Post(ipfs.types.Buffer.from('hello post!'))
    const stream = new Stream()
    const postStat = await post.save()
    stream.addPost(postStat, 'dummy Post')

    const savedStream = await stream.publish('dummykey')
    expect(savedStream)
      .toEqual({
        name: 'QmXNHkfEoA96hzSZsmpEEciGFUnSEsjTF1TpRF6tcXubYJ',
        value: '/ipfs/QmXMTtB2psbDqpLPzii76WWiDukK2XbrzNoYawAhQGhLXL'
      })
  })

  it('should create a stream from ipns cid', async function () {
    const stream = await Stream.from('QmXMTtB2psbDqpLPzii76WWiDukK2XbrzNoYawAhQGhLXL')
    console.log(stream)
  })
})
