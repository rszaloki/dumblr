import { STREAM } from './actionTypes.js'

export const addStream = (stream) => ({
  type: STREAM.ADD,
  stream
})

export const deleteStream = (stream) => ({
  type: STREAM.DELETE,
  stream
})

