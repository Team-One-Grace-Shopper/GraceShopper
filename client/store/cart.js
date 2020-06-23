/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'
import user from './user'

/**
 //* ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const UPDATED_CART = 'UPDATED_CART'
const SUBMITTED_ORDER = 'SUBMITTED_ORDER'
const REMOVE_CART = 'REMOVE_CART'
const CREATED_CART = 'CREATED_CART'
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
export const createdCart = cart => ({type: CREATED_CART, cart})
export const removedItem = cart => ({type: REMOVED_ITEM, cart})

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
        //TODO: if user is not logged in, create user ("isGuest = true"), create cart
        console.log('Create a guest user & cart!')
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
      console.log('Add to cart DATA: ', cart)
      dispatch(addedToCart({...mask, ...cart}))
      // history.push('/cart')
    } catch (error) {
      console.log('Whoops, trouble adding to cart!', error)
    }
  }
}
export const updateCart = (orderId, maskId, update) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/cart/${orderId}/update/${maskId}`,
        update
      )
      dispatch(updatedCart(maskId, data))
    } catch (error) {
      console.log('Whoops, trouble updating your cart!', error)
    }
  }
}

export const createCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/cart/${userId}`)
      dispatch(createdCart(data))
      console.log('DATA IN CREATECART THUNK -->', data)
    } catch (error) {
      console.log('Something went wrong in createCart Thunk', error)
    }
  }
}

export const submitOrder = userId => {
  return async dispatch => {
    try {
      //TODO: create route - all "orders" (in Order table) connected to userId with status "inCart" => change status to "purchased"
      await axios.put(`/api/cart/${userId}/submit`)
      // dispatch(submittedOrder(data))
      // await dispatch(getCart(userId))
      // await dispatch(removeCart())
      //TODO: page with "Thank you your order was submitted!"
      await dispatch(createCart(userId))

      // history.push('/thanks')
    } catch (error) {
      console.log('Whoops, trouble submitting order or redirecting!', error)
    }
  }
}

export const removeItem = (orderId, maskId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`api/cart/${orderId}/${maskId}`)
      dispatch(removeItem(data))
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
    case CREATED_CART:
      return {...state, ...action.cart, loading: false}
    case REMOVED_ITEM:
      return {...state, ...action.cart, loading: false}
    default:
      return state
  }
}
