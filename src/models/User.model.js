import { DataTypes } from 'sequelize'
import sequelize from '../config/db.config.js'

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

export { User }
