import STREAM from './streamActionTypes.js'

export const openStream = (stream) => ({
  type: STREAM.OPEN,
  stream
})

export const initStream = (key, displayName) => {
  const nonce = Math.floor(Math.random() * 100000)

  return {
    type: STREAM.INIT,
    payload
  }
}

export const addPost = (content, stream) => ({
  type: STREAM.ADD_POST,
  content,
  stream
})
