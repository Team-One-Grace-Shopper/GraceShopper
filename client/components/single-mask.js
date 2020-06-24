import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleMask} from '../store/singleMask.js'

// import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// import { updateCart } from '../store/cart.js'
import {addToCart, getCart} from '../store/cart'
import {withRouter} from 'react-router-dom'
// import {withRouter} from 'react-router'

export class SingleMask extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    // const dummyId = parseInt(2)
    this.props.getSingleMask(this.props.match.params.maskId)
  }

  render() {
    const {mask} = this.props
    return (
      <div>
        <h2>{mask.name}</h2>
        <h3>${mask.price}</h3>
        <img src={mask.imageUrl} height="500" width="500" />
        <h4>Description: {mask.description}</h4>
        <Button
          variant="contained"
          onClick={() =>
            this.checkCartBeforeAdd(
              mask,
              this.props.cart.masks,
              this.props.userId
            )
          }
        >
          Add to Cart
        </Button>
      </div>
    )
  }

  checkCartBeforeAdd(mask, masksInCart, userId) {
    console.log('Checking cart!')
    // console.log(this.props.cart)
    // const masksInCart = this.props.cart.masks
    for (let i = 0; i < masksInCart.length; i++) {
      if (masksInCart[i].id === mask.id) {
        console.error('Already in cart!')
        break
      }
    }
    if (this.props.cart.loading) {
      console.log('Something went wrong, please try again!')
      // getCart(this.props.userId)
    } else {
      console.log('Adding to cart!')
      this.props.addToCart(userId, {
        id: mask.id,
        name: mask.name,
        price: mask.price
      })
    }
  }
}

const mapState = state => {
  return {
    mask: state.mask,
    cart: state.cart,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getSingleMask: maskId => dispatch(getSingleMask(maskId)),
    addToCart: (userId, mask) => {
      dispatch(addToCart(userId, mask))
      // dispatch(getCart(userId))
      // console.log(ownProps.history)
      // ownProps.history.push('/cart')
    }
    // getCart: (userId) => dispatch(getCart(userId))
    // ownProps.history.push('/cart')
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleMask))
