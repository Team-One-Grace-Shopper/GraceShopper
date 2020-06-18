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
