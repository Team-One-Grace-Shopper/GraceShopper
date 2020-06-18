const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart',
    allowNull: false,
    validate: {
      isIn: [['cart', 'placed']]
    }
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
})

module.exports = Order
