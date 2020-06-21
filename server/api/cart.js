const router = require('express').Router()
const {Mask, Order, User, Cart} = require('../db/models')
module.exports = router

// *** GET a user's cart  (api/cart/)
router.get('/:userId', async (req, res, next) => {
  try {
    const findCurrentCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'cart'
      },
      include: {
        model: Mask
      }
    })
    // TODO: make sure Cart price is up-to-date with Mask price

    res.json(findCurrentCart)
  } catch (error) {
    next(error)
  }
})

// *** ADD new mask to a user's cart  'api/cart/' (make connection to order with status "cart")

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
