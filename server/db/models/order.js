const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM('cart', 'placed'),
    defaultValue: 'cart'
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0.0
  }
})

module.exports = Order
