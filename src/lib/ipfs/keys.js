import { IPFS } from './index.js'

export async function importKey (name, key, password) {
  const ipfs = await IPFS()
  return ipfs.key.import(name, key, password)
}

export async function generateKey (name) {
  const ipfs = await IPFS()
  return ipfs.key.gen(name, {
    type: 'rsa',
    size: 2048
  })
}

export async function removeKey (name) {
  const ipfs = await IPFS()
  return ipfs.key.rm(name)
}

export async function exportKey (name, password) {
  const ipfs = await IPFS()
  return ipfs.key.export(name, password)
}

export async function allKeys () {
  const ipfs = await IPFS()
  return ipfs.key.list()
}

export async function listKey () {
  const keys = await allKeys()
  const keyMap = new Map()
  keys.forEach(key => keyMap.set(key.name, key))

  return keyMap
}
