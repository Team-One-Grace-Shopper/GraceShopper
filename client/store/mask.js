import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_MASKS = 'GOT_MASKS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const gotMasks = masks => {
  return {
    type: GOT_MASKS,
    masks
  }
}

/**
 * THUNK CREATORS
 */
export const getMasks = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/masks')
      const masks = response.data
      dispatch(gotMasks(masks))
    } catch (error) {
      console.log('Error in getMasks thunk -->', error)
    }
  }
}

/**
 * REDUCER
 */
export default function maskReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MASKS:
      return action.masks

    default:
      return state
  }
}
