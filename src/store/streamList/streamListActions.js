import STREAMLIST from './streamListActionTypes.js'

export const addStream = (stream) => ({
  type: STREAMLIST.ADD,
  stream
})

export const deleteStream = (stream) => ({
  type: STREAMLIST.DELETE,
  stream
})

export const selectStream = (stream) => ({
  type: STREAMLIST.SELECT,
  stream
})
