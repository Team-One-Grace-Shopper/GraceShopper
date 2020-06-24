import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleMask} from '../store/singleMask.js'

import Button from '@material-ui/core/Button'
import {addToCart} from '../store/cart'
import {withRouter} from 'react-router-dom'

export class SingleMask extends Component {
  componentDidMount() {
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
    for (let i = 0; i < masksInCart.length; i++) {
      if (masksInCart[i].id === mask.id) {
        console.error('Already in cart!')
        break
      }
    }
    if (this.props.cart.loading) {
      console.log('Something went wrong, please try again!')
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

const mapDispatch = dispatch => {
  return {
    getSingleMask: maskId => dispatch(getSingleMask(maskId)),
    addToCart: (userId, mask) => {
      dispatch(addToCart(userId, mask))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleMask))
