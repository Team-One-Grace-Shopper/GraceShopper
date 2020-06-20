const router = require('express').Router()
const {Mask} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const masks = await Mask.findAll()
    masks.forEach(mask => {
      mask.price = mask.price / 100
    })
    res.json(masks)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleMask = await Mask.findByPk(req.params.id)
    singleMask.price = singleMask.price / 100
    console.log(singleMask)
    res.json(singleMask)
  } catch (error) {
    next(error)
  }
})
