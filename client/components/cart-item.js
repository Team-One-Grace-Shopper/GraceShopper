import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateCart} from '../store/cart'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
// import TextField from '@material-ui/core/TextField'
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';

/**
 * COMPONENT
 */
export class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    // TODO: add onUpdate, onClick methods
    this.handleKey = this.handleKey.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.mask.cart.quantity
    })
  }

  handleKey(event) {
    if (event.key === 'Enter') {
      this.props.add(this.props.mask.cart.orderId, this.props.mask.id, {
        quantity: this.state.quantity
      })
      this.setState({quantity: 0})
    }
  }

  render() {
    console.log('state update:', this.state.quantity)
    console.log('the orderid: ', this.props.mask.cart.orderId)
    // TODO: update form input validation to not allow anything but integers
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {this.props.mask.name}
        </TableCell>
        <TableCell align="right">
          <form>
            <input
              type="text"
              value={this.state.quantity}
              onChange={event => this.setState({quantity: event.target.value})}
              onKeyDown={this.handleKey}
            />
            {/* <FormControl>
                        <InputLabel htmlFor="component-helper">Name</InputLabel>
                        <Input
                        id="component-helper"
                        value={name}
                        onChange={handleChange}
                        aria-describedby="component-helper-text"
                        />
                        <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
                    </FormControl> */}
          </form>
          <button
            type="button"
            onClick={() => {
              this.props.edit(
                this.props.mask.cart.orderId,
                this.props.mask.id,
                {quantity: this.state.quantity}
              )
            }}
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

// const mapState = state => {
//     return {
//       userId: state.user.id,
//     }
// }

const mapDispatch = dispatch => {
  return {
    edit: (orderId, maskId, update) => {
      dispatch(updateCart(orderId, maskId, update))
    }
  }
}

export default connect(null, mapDispatch)(CartItem)
