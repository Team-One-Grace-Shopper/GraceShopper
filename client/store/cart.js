import axios from 'axios'
import history from '../history'

/**
 //* ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
// const UPDATED_CART = 'UPDATED_CART'
const SUBMITTED_ORDER = 'SUBMITTED_ORDER'

/**
 //* ACTION CREATORS
 */
export const gotCart = cart => ({type: GOT_CART, cart})
// export const updatedCart = (cart) => ({type: UPDATED_CART, cart})
export const submittedOrder = cart => ({type: SUBMITTED_ORDER, cart})

/**
 //* THUNK CREATORS
 */
export const getCart = userId => {
  return async dispatch => {
    try {
      //TODO: create route - all masks connected to userId with status "inCart"
      const {data} = await axios.get(`/api/${userId}/cart`)
      dispatch(gotCart(data))
    } catch (error) {
      console.log('Whoops, trouble fetching desired cart!', error)
    }
  }
}
export const updateCart = (userId, cart) => {
  return async dispatch => {
    try {
      //TODO: create route - all "orders" (in Order table) connected to userId with status "inCart" => change status to "purchased"
      const {data} = await axios.put(`/api/${userId}/cart/update`, cart)
      // dispatch(updatedCart(data))
      dispatch(gotCart(data))
    } catch (error) {
      console.log('Whoops, trouble updating your cart!', error)
    }
  }
}
export const submitOrder = userId => {
  return async dispatch => {
    try {
      //TODO: create route - all "orders" (in Order table) connected to userId with status "inCart" => change status to "purchased"
      const {data} = await axios.put(`/api/${userId}/cart/submit`)
      dispatch(submittedOrder(data))
      //TODO: page with "Thank you your order was submitted!"
      // history.push('/thanks')
      history.push('/home')
    } catch (error) {
      console.log('Whoops, trouble submitting order or redirecting!', error)
    }
  }
}

/**
 //* INITIAL STATE
 */
const initialState = {
  all: [],
  loading: true
}

/**
 //* REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, all: action.cart, loading: false}
    // case UPDATED_CART:
    //     return {...state, ...action.cart, loading: false}
    case SUBMITTED_ORDER:
      return initialState
    default:
      return state
  }
}
