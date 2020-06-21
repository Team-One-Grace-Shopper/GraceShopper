const Sequelize = require('sequelize')
const db = require('../db')

const Mask = db.define('mask', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Mask
