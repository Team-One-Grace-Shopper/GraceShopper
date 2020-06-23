import axios from 'axios'
import history from '../history'

/**
 //* ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
// const UPDATED_CART = 'UPDATED_CART'
const SUBMITTED_ORDER = 'SUBMITTED_ORDER'
const REMOVE_CART = 'REMOVE_CART'
// const CREATED_CART = 'CREATED_CART'

/**
 //* ACTION CREATORS
 */
export const gotCart = cart => ({type: GOT_CART, cart})
export const addedToCart = mask => ({type: ADDED_TO_CART, mask})
// export const updatedCart = (cart) => ({type: UPDATED_CART, cart})
export const submittedOrder = cart => ({type: SUBMITTED_ORDER, cart})
export const removeCart = cart => ({type: REMOVE_CART, cart})
// export const createdCart = cart => ({type: CREATED_CART, cart})

/**
 //* THUNK CREATORS
 */
export const getCart = userId => {
  return async dispatch => {
    try {
      //TODO: create route - all masks connected to userId with status "inCart"
      if (userId !== 0) {
        const {data} = await axios.get(`/api/cart/${userId}`)
        console.log('getCart thunk data: ', data)
        dispatch(gotCart(data))
      } else {
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
      // console.log("Mask + cart DATA: ", {...mask, ...cart[0]})
      // dispatch(addedToCart({...mask, ...cart[0]}))
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
      console.log("Let's update cart!", orderId, maskId)
      //TODO: create route - all "orders" (in Order table) connected to userId with status "inCart" => change status to "purchased"
      // const {data} = await axios.put(`/api/cart/${userId}/update`, cart)
      const {data} = await axios.post(
        `/api/cart/${orderId}/update/${maskId}`,
        update
      )
      console.log(data)
      // // dispatch(updatedCart(data))
      // dispatch(gotCart(data))
    } catch (error) {
      console.log('Whoops, trouble updating your cart!', error)
    }
  }
}

// export const createCart = userId => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.post(`/api/cart/${userId}`)
//       dispatch(createdCart(data))
//       console.log('DATA IN CREATECART THUNK -->', data)
//     } catch (error) {
//       console.log('Something went wrong in createCart Thunk', error)
//     }
//   }
// }

export const submitOrder = userId => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/${userId}/submit`)
      // await dispatch(createCart(userId))
    } catch (error) {
      console.log('Whoops, trouble submitting order or redirecting!', error)
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
    // case UPDATED_CART:
    //     return {...state, ...action.cart, loading: false}
    case REMOVE_CART:
      return initialState
    // case CREATED_CART:
    //   return {...state, ...action.cart, loading: false}
    default:
      return state
  }
}
