import { ipfs } from './index.js'

export function initStream (key, displayName, nonce) {
  return ipfs().then(node => node.object.put({
    Data: JSON.stringify({
      displayName,
      nonce
    }),
    Links: []
  })).then(dagNode => ipfs().then(node => node.name.publish(dagNode.toJSON().multihash, { key })))
    .then(result => ({
      id: result.name,
      head: result.value,
      displayName
    }))
}
