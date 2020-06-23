import React from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'

class Thanks extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  render() {
    return (
      <div>
        <h2>Thank you for shopping! Your order is confirmed!</h2>
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id
})

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(getCart(userId))
  }
}

export default connect(mapState, mapDispatch)(Thanks)
