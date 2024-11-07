// import { DataTypes } from 'sequelize';
// import sequelize from '../config/db.config.mjs';
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Servicio = sequelize.define('Servicio', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
});

// export { Servicio }
module.exports = Servicio