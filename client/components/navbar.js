import React, {useState} from 'react'
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

const Navbar = ({handleClick, isLoggedIn, numberOfCartItems}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuId = 'menu-appbar-user'
  const renderUserMenu = (
    <Menu
      id={menuId}
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
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem button component={Link} to="/profile" onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem
        className="Logout"
        onClick={() => {
          handleClick()
          handleMenuClose()
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  )

  return (
    <div>
      <h1>MASKS R US</h1>

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
                <Link to="/" className={classes.appBarLink}>
                  Masks R Us
                </Link>
              </Typography>

              <IconButton
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {isLoggedIn ? <Icon>account_circle</Icon> : null}
              </IconButton>

              {isLoggedIn ? null : (
                <div>
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
                </div>
              )}

              <IconButton
                aria-label="number of items in cart"
                component={Link}
                to="/cart"
                color="inherit"
              >
                <Badge
                  badgeContent={isLoggedIn ? numberOfCartItems : 0}
                  color="secondary"
                >
                  <Icon color="inherit">shopping_cart</Icon>
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          {isLoggedIn ? renderUserMenu : null}
        </div>
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    numberOfCartItems: state.cart.masks.length
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 //* PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
