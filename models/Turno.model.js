const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('../config/db.config')

const Turno = sequelize.define('Turno', {
  numeroTurno: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'atendido'),
    allowNull: false,
    defaultValue: 'pendiente',
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['servicioId', 'fecha', 'numeroTurno'],
    },
  ],
});

// const Turno = sequelize.define('Turno', {
//   numeroTurno: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     unique: true,
//   },
//   estado: {
//     type: DataTypes.ENUM('pendiente', 'atendido'),
//     allowNull: false,
//     defaultValue: 'pendiente',
//   },
// }, {
//   timestamps: true,
// });


module.exports = Turno