const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// *** GET all orders  /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    orders.forEach(order => {
      order.total = order.total / 100
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
