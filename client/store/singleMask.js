import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_SINGLE_MASK = 'GOT_SINGLE_MASK'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const gotSingleMask = mask => {
  return {
    type: GOT_SINGLE_MASK,
    mask
  }
}

/**
 * THUNK CREATORS
 */
export const getSingleMask = maskId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/masks/${maskId}`)
      const mask = response.data
      dispatch(gotSingleMask(mask))
    } catch (error) {
      console.log('Error in getSingleMask thunk -->', error)
    }
  }
}

/**
 * REDUCER
 */
export default function singleMaskReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_SINGLE_MASK:
      return action.mask
    default:
      return state
  }
}
