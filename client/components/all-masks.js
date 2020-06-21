import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMasks} from '../store/mask.js'
import {Link} from 'react-router-dom'
import {getCart} from '../store/cart'

export class AllMasks extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getMasks()
    this.props.isLoggedIn
      ? this.props.getCart(this.props.userId)
      : this.props.getCart(0)
  }

  render() {
    const {masks} = this.props

    return (
      <div>
        <h1>Take a look at all of our Masks:</h1>
        {masks ? (
          masks.map(mask => {
            return (
              <div key={mask.id}>
                <Link to={`/mask/${mask.id}`}>
                  <h3>{mask.name}</h3>
                </Link>
                <img src={mask.imageUrl} height="300" width="300" />
                <h6>${mask.price}</h6>
              </div>
            )
          })
        ) : (
          <h1>No masks found!</h1>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    masks: state.masks,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getMasks: () => dispatch(getMasks()),
    getCart: userId => dispatch(getCart(userId))
  }
}

export default connect(mapState, mapDispatch)(AllMasks)
