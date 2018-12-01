import { IPFS } from './index.js'

const metaNode = Symbol('metaNode')
const postsNode = Symbol('postsNode')
const postList = Symbol('postList')
const meta = Symbol('meta')

/*
* Stream : metaNode, postsNode, displayName, posts
*/

export class Stream {
  constructor (displayName = 'untitled stream') {
    this[postsNode] = null
    this[metaNode] = null
    this[meta] = { displayName }
    this[postList] = []
  }

  getPage (start = 0, count = 20) {
    const result = []
    const size = this[postList].length
    for (let i = 0; i < count; i++) {
      result[i] = this[postList][size - start - 1 - i]
    }
    return result
  }

  addPost (postInfo, name) {
    if (!name) {
      name = postInfo.Hash
    }
    this[postList].push({
      Name: name,
      Hash: postInfo.Hash,
      Size: postInfo.Size
    })
  }

  async save () {
    const ipfs = await IPFS()
    console.log(this[postList])
    const postsNode = await ipfs.object.put({
      Data: JSON.stringify(this.getPage()),
      Links: this[postList]
    })
    const jsonPostsNode = postsNode.toJSON()
    console.log(jsonPostsNode.multihash, jsonPostsNode.size)

    return ipfs.object.put({
      Data: JSON.stringify(this[meta]),
      Links: [{ Name: 'index', Hash: jsonPostsNode.multihash, Size: jsonPostsNode.size }]
    })
  }

  async publish (key) {
    const ipfs = await IPFS()
    const headDagNode = (await this.save()).toJSON()

    const result = await ipfs.name.publish(headDagNode.multihash, {
      key,
      resolve: false
    })

    return result
  }

  set metaNode (newMetaNode) {
    this[metaNode] = newMetaNode
    this[meta] = JSON.parse(this[metaNode].data.toString())
  }

  set postsNode (newPostsNode) {
    this[postsNode] = postsNode
    this[postList] = this[postsNode].links
  }

  static async from (cid) {
    const ipfs = await IPFS()
    const newStream = new Stream()
    const metaDagNode = await ipfs.object.get(cid)
    newStream.metaDagNode = metaDagNode

    const postsDagNodeLink = metaDagNode.links.find(link => link.name === 'index')
    if (postsDagNodeLink) {
      const postsDagNode = await ipfs.object.get(postsDagNodeLink.cid.toString())
      newStream.postsDagNode = postsDagNode
    }

    return newStream
  }
}
