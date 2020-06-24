import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMasks} from '../store/mask.js'
import {getCart} from '../store/cart'

import Grid from '@material-ui/core/Grid'
import AllMasksListItem from './all-masks-list-item.js'

export class AllMasks extends Component {
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
        <h1 className="header">Take a look at all of our Masks</h1>
        <div className="root">
          <Grid container spacing={3}>
            {masks ? (
              masks.map(mask => {
                return (
                  <Grid item xs={12} sm={6} key={mask.id}>
                    <AllMasksListItem mask={mask} />
                  </Grid>
                )
              })
            ) : (
              <h1>No masks found!</h1>
            )}
          </Grid>
        </div>
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
