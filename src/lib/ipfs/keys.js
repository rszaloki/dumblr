import { ipfs } from './index.js'

export function importKey (name, key, password) {
  return ipfs().then(node => node.key.import(name, key, password))
}

export function generateKey (name) {
  return ipfs().then(node => node.key.gen(name, {
    type: 'rsa',
    size: 2048
  }))
}

export function removeKey (name) {
  return ipfs().then(node => node.key.rm(name))
}

export function exportKey (name, password) {
  return ipfs().then(node => node.key.export(name, password))
}

export function listKey () {
  return ipfs().then(node => node.key.list()).then(keys => keys.map(key => key.name))
}
