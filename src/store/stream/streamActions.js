import STREAM from './streamActionTypes.js'
import { ipfs, ANCHOR } from '../../lib/ipfs/index.js'

export const openStream = (stream) => ({
  type: STREAM.OPEN,
  stream
})

export const initStream = (key, displayName) => ({
  type: STREAM.INIT,
  payload: ipfs().then(node => {
    node.name.publish(ANCHOR, { key })
  }),
  meta: {
    displayName
  }
})

export const addPost = (content, stream) => ({
  type: STREAM.ADD_POST,
  content,
  stream
})
