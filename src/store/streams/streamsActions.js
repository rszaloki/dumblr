import { STREAM } from './streamsActionTypes.js'

export const addStream = (stream) => ({
  type: STREAM.ADD,
  stream
})

export const deleteStream = (stream) => ({
  type: STREAM.DELETE,
  stream
})

export const selectStream = (stream) => ({
  type: STREAM.SELECT,
  stream
})
