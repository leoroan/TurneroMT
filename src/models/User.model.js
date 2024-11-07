// import { DataTypes } from 'sequelize'
// import sequelize from '../config/db.config.mjs'
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')


const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

// export { User }
module.exports = User
