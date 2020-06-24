import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCart, updateCart, removeItem} from '../store/cart'
import history from '../history'
import {CartItem} from './cart-item'

//#region   CARD & TABLE
import Card from '@material-ui/core/Card'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
//#endregion

/**
 //* COMPONENT
 */
export class CartPage extends Component {
  componentDidMount() {
    this.props.isLoggedIn
      ? this.props.getCart(this.props.userId)
      : this.props.getCart(0)
  }

  render() {
    const {cart} = this.props
    if (cart.loading) return <div>loading...</div>
    if (cart.masks.length) {
      return (
        <div>
          <Card>
            <CardHeader title="Shopping Cart" subheader="Selected items" />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price ($)</TableCell>
                    <TableCell align="right">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.masks.map(mask => (
                    <CartItem
                      key={mask.id}
                      mask={mask}
                      userId={this.props.userId}
                      updateCart={this.props.updateCart}
                      removeItem={this.props.removeItem}
                    />
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} colSpan={1} />
                    <TableCell colSpan={1} align="right">
                      Total
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      {cart.total}
                    </TableCell>
                    <TableCell colSpan={1} align="right" />
                  </TableRow>
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="secondary"
                className="checkout"
                onClick={() => history.push('/submit')}
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    } else {
      return <div>Sorry, no items in cart</div>
    }
  }
}

/**
 //* CONTAINER
 */
const mapState = state => {
  console.log('Mapping State to Props:', state)
  return {
    userId: state.user.id,
    cart: state.cart,
    loading: state.cart.loading,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  console.log('Mapping dispatch to props')
  return {
    getCart: userId => dispatch(getCart(userId)),
    updateCart: (userId, orderId, maskId, update) => {
      dispatch(updateCart(userId, orderId, maskId, update))
    },
    removeItem: (orderId, maskId) => {
      dispatch(removeItem(orderId, maskId))
    }
  }
}

export default connect(mapState, mapDispatch)(CartPage)

/**
 //* PROP TYPES
*/
// CartPage.propTypes = {
//   cart: PropTypes.array
// }
