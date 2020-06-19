const router = require('express').Router()
const {Mask} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const masks = await Mask.findAll()
    res.json(masks)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleMask = await Mask.findByPk(req.params.id)
    res.json(singleMask)
  } catch (error) {
    next(error)
  }
})
