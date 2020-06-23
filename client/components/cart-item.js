import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCart} from '../store/cart'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

/**
 //* COMPONENT
 */
export class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleKey = this.handleKey.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.mask.cart.quantity
    })
  }

  handleKey(event) {
    if (event.key === 'Enter') {
      this.props.updateCart(this.props.mask.cart.orderId, this.props.mask.id, {
        quantity: this.state.quantity
      })
    }
  }

  render() {
    // TODO: update form input validation to not allow anything but integers
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {this.props.mask.name}
        </TableCell>
        <TableCell align="right">
          <input
            type="text"
            value={this.state.quantity}
            onChange={event => this.setState({quantity: event.target.value})}
            onKeyDown={this.handleKey}
          />
          <button
            type="button"
            onClick={() =>
              this.props.updateCart(
                this.props.mask.cart.orderId,
                this.props.mask.id,
                {quantity: this.state.quantity}
              )
            }
          >
            Update
          </button>
        </TableCell>
        <TableCell align="right">{this.props.mask.price}</TableCell>
        <TableCell align="right">
          <IconButton color="inherit" aria-label="delete">
            <Icon>delete</Icon>
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateCart: (orderId, maskId, update) => {
      dispatch(updateCart(orderId, maskId, update))
    }
  }
}

export default connect(null, mapDispatch)(CartItem)
