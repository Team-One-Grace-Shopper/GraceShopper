import React from 'react'
import {Link} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export default function AllMasksListItem(props) {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Link to={`/mask/${props.mask.id}`}>
        <h3>{props.mask.name}</h3>
      </Link>
      <img src={props.mask.imageUrl} height="300" width="300" />
      <h4>${props.mask.price}</h4>
    </Paper>
  )
}
