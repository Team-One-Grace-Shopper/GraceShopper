import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrder, getCart} from '../store/cart'
import history from '../history'

import {Button} from '@material-ui/core'
class Checkout extends Component {
  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  async handleSubmit() {
    await this.props.submitOrder(this.props.userId)
    history.push('/thanks')
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div style={{margin: '200px'}}>
        <form>
          <label>First Name</label>
          <input type="text" />
          <label>Last Name</label>
          <input type="text" />
          <label>Email</label>
          <input type="text" />
          <label>Address</label>
          <input type="text" />
          <label>Credit Card</label>
          <input type="text" />
        </form>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => this.handleSubmit()}
        >
          Confirm!
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(getCart(userId)),
    submitOrder: userId => dispatch(submitOrder(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
