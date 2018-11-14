const IPFS = window.Ipfs

let __node__ = null

export function ipfs () {
  if (__node__) {
    return __node__
  }

  __node__ = new Promise(resolve => {
    const node = new IPFS({pass:'malacmalacmalacmalacmalac'})
    node.once('ready', () => {
      console.log('IPFS node ready!')
      resolve(node)
    })
  })

  return __node__
}

export const ANCHOR = '/ipfs/QmZWSMu7P4sDaU5sbqk99jUwJTePXJDRWyWhKFGoTpkvr8'
