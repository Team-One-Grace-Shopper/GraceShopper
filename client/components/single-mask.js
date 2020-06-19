import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleMask} from '../store/mask.js'

// import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export class SingleMask extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getSingleMask(1)
  }

  render() {
    const {mask} = this.props
    return (
      <div>
        <h2>{mask.name}</h2>
        <h3>${mask.price}</h3>
        <img src={mask.imgUrl} height="600" width="600" />
        <h4>Description: {mask.description}</h4>
        <Button variant="contained">Add to Cart</Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    mask: state.mask
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleMask: maskId => dispatch(getSingleMask(maskId))
  }
}

export default connect(mapState, mapDispatch)(SingleMask)
