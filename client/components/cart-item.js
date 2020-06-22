import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

/**
 * COMPONENT
 */
export class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 0
    }
    // TODO: add onUpdate, onClick methods
  }

  componentDidMount() {
    console.log('This mask in CartItem: ', this.props.mask)
    this.setState({
      qty: this.props.mask.cart.quantity
    })
  }

  render() {
    console.log('mask in CartItem RENDER: ', this.props.mask)
    return (
      // <div>
      <TableRow>
        <TableCell component="th" scope="row">
          {this.props.mask.name}
        </TableCell>
        <TableCell align="right">{this.props.mask.cart.quantity}</TableCell>
        <TableCell align="right">{this.props.mask.price}</TableCell>
        <TableCell align="right">
          <IconButton
            // edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Icon>delete</Icon>
          </IconButton>
        </TableCell>
      </TableRow>
    )
    // </div>)
  }
}
