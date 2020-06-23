import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrder} from '../store/cart'
import {getCart} from '../store/cart'
import history from '../history'
class Checkout extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  async handleSubmit() {
    console.log('Button clicked. Cart was placed')
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
          <label>Email</label>
          <input type="text" />
          <label>Last Name</label>
          <input type="text" />
          <label>Address</label>
          <input type="text" />
          <label>Credit Card</label>
          <input type="text" />
        </form>
        <button onClick={() => this.handleSubmit()}>Confirm!</button>
      </div>
    )
  }
}
//this.props.submitOrder(this.props.userId)
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
