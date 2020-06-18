const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cartMask', {
  quantity: {
    type: Sequelize.INTEGER,
    allownull: false,
    validate: {
      min: 0
    },
    dafaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    allownNull: false,
    defaultValue: 0
  }
})

module.exports = Cart
