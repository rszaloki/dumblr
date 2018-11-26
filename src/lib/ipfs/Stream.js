const metaNode = Symbol('metaNode')
const postsNode = Symbol('postsNode')
const displayName = Symbol('displayName')


export class Stream {
  constructor () {
    this[metaNode] = null
    this[postsNode] = null
    this[displayName] = null
  }

  set metaNode(newMetaNode) {

  }

  set postsNode(newPostsNode) {

  }

  static from (ipnsCID) {

  }
}
