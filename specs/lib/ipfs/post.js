/* global describe, it, expect */
import { Post } from '../../../src/lib/ipfs/post.js'
import { IPFS } from '../../../src/lib/ipfs/index.js'

describe('post ', function () {
  it('should save a node', async function () {
    const ipfs = await IPFS()
    const post = new Post(ipfs.types.Buffer.from('hello post!'))
    const postStat = await post.save()
    console.log(postStat)
    expect(postStat).toEqual({ Hash: 'QmdEbxyB397NmzDoD6dLDtEaxtRRKsy5dob2Zm9GG6JriQ', Size: 98 })
  })

  it('should read back a node', async function () {
    const post = await Post.fromCID('QmdEbxyB397NmzDoD6dLDtEaxtRRKsy5dob2Zm9GG6JriQ')
    expect(post.content.toString()).toEqual('hello post!')
  })
})
