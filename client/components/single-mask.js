import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleMask} from '../store/singleMask.js'

// import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export class SingleMask extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    // const dummyId = parseInt(2)
    this.props.getSingleMask(this.props.match.params.maskId)
  }

  render() {
    const {mask} = this.props
    return (
      <div>
        <h2>{mask.name}</h2>
        <h3>${mask.price / 100}</h3>
        <img src={mask.imageUrl} height="600" width="600" />
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
