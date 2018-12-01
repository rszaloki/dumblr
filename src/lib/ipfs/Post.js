import { IPFS } from './index.js'

/*
* Post : (Data, Links)
* Post.Data : (contentType, width, height, length, author)
* Post.Links : (linkToContentNode)
*
*
*/

export class Post {
  constructor (content = '', meta = { contentType: 'text/plain' }) {
    this.content = content
    this.meta = meta
  }

  async save () {
    const ipfs = await IPFS()
    const contentNodeStatList = await ipfs.files.add(this.content)
    const contentNodeStat = contentNodeStatList.pop()
    const jsonDagNode = (await ipfs.object.put({
      Data: JSON.stringify(this.meta),
      Links: [{ Name: 'content', Hash: contentNodeStat.hash, Size: contentNodeStat.size }]
    })).toJSON()

    return {
      Hash: jsonDagNode.multihash,
      Size: jsonDagNode.size
    }
  }

  static async fromDAGNode (dagNode) {
    const ipfs = await IPFS()
    const newPost = new Post()
    const contentDagLink = dagNode.links[0]
    const contentList = await ipfs.files.get(contentDagLink.cid)
    newPost.meta = JSON.parse(dagNode.data.toString())
    if (contentList.length > 0) {
      newPost.content = contentList[0].content
    }
    return newPost
  }

  static async fromCID (CID) {
    const ipfs = await IPFS()
    const dagNode = await ipfs.object.get(CID)
    return Post.fromDAGNode(dagNode)
  }
}
