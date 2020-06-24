import axios from 'axios'
import history from '../history'

/**
 //* ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const UPDATED_CART = 'UPDATED_CART'
const SUBMITTED_ORDER = 'SUBMITTED_ORDER'
const REMOVE_CART = 'REMOVE_CART'
const REMOVED_ITEM = 'REMOVED_ITEM'

/**
 //* ACTION CREATORS
 */
export const gotCart = cart => ({type: GOT_CART, cart})
export const addedToCart = mask => ({type: ADDED_TO_CART, mask})
export const updatedCart = (maskId, cart) => ({
  type: UPDATED_CART,
  maskId,
  cart
})
export const submittedOrder = cart => ({type: SUBMITTED_ORDER, cart})
export const removeCart = cart => ({type: REMOVE_CART, cart})
export const removedItem = maskId => ({type: REMOVED_ITEM, maskId})

/**
 //* THUNK CREATORS
 */
export const getCart = userId => {
  return async dispatch => {
    try {
      if (userId !== 0) {
        const {data} = await axios.get(`/api/cart/${userId}`)
        dispatch(gotCart(data))
      } else {
        console.log('Sorry, please signup & login!')
      }
    } catch (error) {
      console.log('Whoops, trouble fetching desired cart!', error)
    }
  }
}

export const addToCart = (userId, mask) => {
  return async dispatch => {
    try {
      const {cart} = await axios.post(
        `/api/cart/${userId}/addToCart/${mask.id}`
      )
      dispatch(addedToCart({...mask, ...cart}))
    } catch (error) {
      console.log('Whoops, trouble adding to cart!', error)
    }
  }
}
export const updateCart = (userId, orderId, maskId, update) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/cart/${userId}/${orderId}/update/${maskId}`,
        update
      )
      dispatch(updatedCart(maskId, data))
    } catch (error) {
      console.log('Whoops, trouble updating your cart!', error)
    }
  }
}

export const submitOrder = userId => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/${userId}/submit`)
    } catch (error) {
      console.log('Whoops, trouble submitting order or redirecting!', error)
    }
  }
}

export const removeItem = (orderId, maskId) => {
  return async dispatch => {
    try {
      await axios.delete(`api/cart/${orderId}/remove/${maskId}`)
      dispatch(removedItem(maskId))
    } catch (error) {
      console.log('Whoops, trouble deleting item from your cart!')
    }
  }
}

/**
 //* INITIAL STATE
 */
const initialState = {
  masks: [],
  loading: true
}

/**
 //* REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, ...action.cart, loading: false}
    case ADDED_TO_CART:
      return {...state, masks: [...state.masks, action.mask], loading: false}
    case UPDATED_CART:
      return {
        ...state,
        masks: state.masks.map(mask => {
          if (mask.id === action.maskId) {
            mask.cart = action.cart
          }
          return mask
        }),
        loading: false
      }
    case REMOVE_CART:
      return initialState
    case REMOVED_ITEM:
      return {
        ...state,
        masks: state.masks.filter(mask => mask.id !== action.maskId)
      }
    default:
      return state
  }
}
