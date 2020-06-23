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
      // where: {
      //   attributes: ['date', 'total', 'status']
      // },
      include: {
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      }
    })
    res.json(allOrders)
  } catch (error) {
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

router.put('/masks/:id', isAdmin, async (req, res, next) => {
  try {
    const foundMask = await Mask.findByPK(req.params.id)
    const updatedMask = await foundMask.update(req.body)
    res.json(updatedMask)
  } catch (error) {
    next(error)
  }
})

router.delete('/masks/:id', isAdmin, async (req, res, next) => {
  try {
    await Mask.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
