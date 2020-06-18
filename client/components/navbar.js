import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {withRouter} from 'react-router'

import {makeStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appBarLink: {
    color: 'white'
  }
}))

const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl, anchorElCart, setAnchorElCart] = React.useState(
    null
  )
  const open = Boolean(anchorEl)
  const openCart = Boolean(anchorElCart)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleCartMenuOpen = event => {
    setAnchorElCart(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setAnchorElCart(null)
  }

  return (
    <div>
      <h1>MASKS R US</h1>
      {/* <div>
      <Icon color="secondary">search</Icon>
      <Icon color="secondary">shopping_cart</Icon>
      <Icon color="primary">add_shopping_cart</Icon>
      <Icon>account_circle</Icon>
      <Icon>login</Icon>
    </div> */}

      <nav>
        <div className={classes.root}>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <Icon>menu</Icon>
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                Masks R Us
              </Typography>
              {isLoggedIn ? (
                <div>
                  {/* The navbar will show these links after you log in */}
                  {/* <Link to="/home" className={classes.appBarLink}>Home</Link> */}
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar-user"
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <Icon>account_circle</Icon>
                    </IconButton>

                    <Menu
                      id="menu-appbar-user"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={open}
                      onClose={handleMenuClose}
                    >
                      {/* <MenuItem onClick={handleProfileClick}>Profile</MenuItem> */}
                      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClick}>Logout</MenuItem>
                    </Menu>

                    <IconButton
                      aria-label="number of items in cart"
                      color="inherit"
                    >
                      <Badge badgeContent={3} color="secondary">
                        <Icon color="inherit">shopping_cart</Icon>
                      </Badge>
                    </IconButton>
                  </div>
                </div>
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <Button color="inherit">
                    <Link to="/login" className={classes.appBarLink}>
                      Login
                    </Link>
                  </Button>
                  <Button color="inherit">
                    <Link to="/signup" className={classes.appBarLink}>
                      Sign Up
                    </Link>
                  </Button>
                  <IconButton
                    aria-label="show items in cart"
                    aria-controls="menu-appbar-cart"
                    aria-haspopup="true"
                    onClick={handleCartMenuOpen}
                    color="inherit"
                  >
                    <Badge badgeContent={3} color="secondary">
                      <Icon color="inherit">shopping_cart</Icon>
                    </Badge>
                  </IconButton>

                  <Menu
                    id="menu-appbar-cart"
                    anchorEl={anchorElCart}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={openCart}
                    onClose={handleMenuClose}
                  >
                    {/* <MenuItem onClick={handleProfileClick}>Profile</MenuItem> */}
                    <MenuItem onClick={handleMenuClose}>Edit Cart</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Checkout</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    handleProfileClick: () => {
      ownProps.history.push('/home')
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
