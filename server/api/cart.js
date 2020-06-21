const router = require('express').Router()
const {Mask, Order, User, Cart} = require('../db/models')
module.exports = router

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

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.addOrCreateOrder(req.user.id)
    if (order !== undefined) {
      order.addItemToOrder(req.body.id, order.id)
    }
    res.json(order)
  } catch (error) {
    next(error)
  }
})

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
