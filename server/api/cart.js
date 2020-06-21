const router = require('express').Router()
const {Mask, Order, User, Cart} = require('../db/models')
module.exports = router

// *** GET a user's cart  (api/cart/)
router.get('/:userId', async (req, res, next) => {
  try {
    const currentCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'cart'
      },
      include: {
        model: Mask,
        attributes: ['id', 'name', 'price']
      }
    })
    // TODO: make sure Cart price is up-to-date with Mask price

    currentCart.masks.forEach(mask => {
      mask.price = mask.price / 100
    })
    // TODO: calculate order total before sending JSON

    res.json(currentCart)
  } catch (error) {
    next(error)
  }
})

// *** ADD new mask to a user's cart  'api/cart/' (make connection to order with status "cart")
router.post('/:userId/addToCart/:maskId', async (req, res, next) => {
  try {
    if (req.params.userId !== 0) {
      const userCart = await Order.findOne({
        where: {
          userId: req.params.userId,
          status: 'cart'
        }
      })
      // TODO: what if already in cart?
      const updateToCart = await userCart.addMask([req.params.maskId])
      // console.log("Add mask to cart: ", response)
      // TODO: could add req.body with QUANTITY

      // res.json(userCart)
      // res.json(updateToCart)
      // res.redirect('/')
    } else {
      //TODO: create user (as guest), create order, then add to cart
    }

    // *** if no cart...
  } catch (error) {
    next(error)
  }
})

// *** CREATE new order (with status = cart)

// *** UPDATE cart (quantity)

router.post('/:userId', async (req, res, next) => {
  try {
    const order = await Order.addOrCreateOrder(req.user.id)
    // const currentCart = await userInstance.addOrCreateOrder()
    if (order !== undefined) {
      order.addItemToOrder(req.body.id, order.id)
    }
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// *** SUBMIT order (get current price of mask (from mask model) to update $ in cart model, calculate order total, mark order as "placed", update the order DATE)
router.put('/submit', async (req, res, next) => {
  try {
    if (req.user !== undefined) {
      const newOrder = await Order.findOne({
        where: {
          id: req.user.id,
          status: 'cart'
        }
      })
      await newOrder.update({status: 'placed'})
      res.json(newOrder)
    }
  } catch (error) {
    next(error)
  }
})
