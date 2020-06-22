import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrder} from '../store/cart'
import {getCart} from '../store/cart'
import hisroty from '../history'
class Checkout extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  async handleSubmit(event) {
    console.log('Button clicked. Cart was placed')
    await this.props.submitOrder(this.props.userId)
    history.pushState('/thanks')
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div style={{margin: '200px'}}>
        {/* <CheckoutForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        state={this.state}
        /> */}

        <button onClick={() => this.handleSubmit()}>Confirmed!</button>
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
