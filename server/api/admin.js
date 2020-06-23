const router = require('express').Router()
const {Mask, Order, User, Cart} = require('../db/models')
module.exports = router

function isAdmin(req, res, next) {
  if (req.user === undefined || !req.user.isAdmin) {
    const error = new Error('illegal action')
    error.status = 401
    return next(error)
  }
  next()
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      where: {
        attributes: ['data', 'total', 'price']
      },
      include: {
        model: Mask,
        attributes: ['id', 'name', 'price']
      }
    })
  } catch {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newMask = await Mask.create(req.body)
    res.json(newMask)
  } catch (error) {
    next(error)
  }
})
