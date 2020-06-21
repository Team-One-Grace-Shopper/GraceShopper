import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'
import {CartItem} from './cart-item'

import {makeStyles} from '@material-ui/core/styles'
// import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
// import ButtonBase from '@material-ui/core/ButtonBase'

//#region   CARD & TABLE
import Card from '@material-ui/core/Card'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
//#endregion
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    marginTop: 40,
    borderRadius: theme.spacing(0.5),
    transition: '0.3s',
    width: '90%',
    overflow: 'initial',
    background: '#ffffff'
  },
  content: {
    paddingTop: 0,
    textAlign: 'left',
    overflowX: 'auto',
    '& table': {
      marginBottom: 0
    }
  },
  cardHeader: {
    // boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
    width: '88%',
    backgroundColor: 'rgb(63, 81, 181)',
    color: theme.palette.common.white,
    margin: '-40 auto 0',
    borderRadius: 16
  }
}))

/**
 //* COMPONENT
 */
export class CartPage extends Component {
  // const classes = useStyles()
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
        // <div className={classes.root}>
        <div>
          {/* <Card className={classes.card}> */}
          <Card>
            <CardHeader
              // className={classes.cardHeader}
              // classes={cardHeaderStyles}
              title="Shopping Cart"
              subheader="Selected items"
            />
            {/* <CardContent className={classes.content}> */}
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
                    <TableRow key={mask.id}>
                      <TableCell component="th" scope="row">
                        {mask.name}
                      </TableCell>
                      <TableCell align="right">{mask.cart.quantity}</TableCell>
                      <TableCell align="right">{mask.price}</TableCell>
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
    getCart: userId => dispatch(getCart(userId))
    // TODO: submitOrder
  }
}

export default connect(mapState, mapDispatch)(CartPage)

/**
   //* PROP TYPES
   */
// CartPage.propTypes = {
//   cart: PropTypes.array
// }
