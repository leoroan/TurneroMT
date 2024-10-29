const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite',
  timezone: '-03:00',
  logging: false
})

module.exports = sequelize
