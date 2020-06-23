// import React, {useState} from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {removeItem, getCart} from '../store/cart'
// import history from '../history'

// import IconButton from '@material-ui/core/IconButton'
// import Icon from '@material-ui/core/Icon'

// /**
//  //* COMPONENT
//  */
// export function RemoveItem(props) {
//   const [updateCart, onClickRemove] = useState(getCart)
//   return (
//     <IconButton
//       color="inherit"
//       aria-label="delete"
//       type="button"
//       onClick={() => {
//         onClickRemove(updateCart)
//       }}
//     >
//       <Icon>delete</Icon>
//     </IconButton>
//   )
// }

// const mapDispatch = dispatch => {
//   return {
//     removeItem: (orderId, maskId) => {
//       dispatch(removeItem(orderId, maskId))
//     }
//   }
// }

// export default connect(null, mapDispatch)(RemoveItem)
