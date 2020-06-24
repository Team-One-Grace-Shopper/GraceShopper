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
    currentCart.total = currentCart.total / 100
    currentCart.masks.forEach(mask => {
      mask.price = mask.price / 100
    })
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
      const updateToCart = await userCart.addMask([req.params.maskId])
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/:orderId/update/:maskId', async (req, res, next) => {
  try {
    const [NumOfAffectedRows, affectedRows] = await Cart.update(req.body, {
      where: {
        orderId: req.params.orderId,
        maskId: req.params.maskId
      },
      returning: true,
      plain: true
    })
    if (affectedRows) {
      res.json(affectedRows)
    }
  } catch (error) {
    next(error)
  }
})

// *** SUBMIT order (get current price of mask (from mask model) to update $ in cart model, calculate order total, mark order as "placed", update the order DATE, create new order with status "cart")
router.put('/:userId/submit', async (req, res, next) => {
  try {
    if (req.params.userId) {
      const foundOrder = await Order.findOne({
        where: {
          userId: req.params.userId,
          status: 'cart'
        },
        include: {
          model: Mask,
          attributes: ['price']
        }
      })
      const findTotal = (arr, startVal = 0) => {
        return arr.reduce((accum, masks) => {
          return accum + masks.price
        }, startVal)
      }
      const total = findTotal(foundOrder.masks)

      await foundOrder.update({
        status: 'placed',
        date: Date.now(),
        total: total
      })

      const theUser = await User.findByPk(req.params.userId)
      const theNewCart = theUser.createOrder()

      res.json(theNewCart)
    }
  } catch (error) {
    next(error)
  }
})

// *** Deleting an item from a cart
router.delete('/:userId/:orderId/remove/:maskId', async (req, res, next) => {
  try {
    const userCart = await Order.findByPk(req.params.orderId)
    if (userCart) {
      userCart.removeMask(req.params.maskId)
      res.send(userCart).status(202)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
