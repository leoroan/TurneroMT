const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

const Turno = sequelize.define('Turno', {
  numeroTurno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'atendido'),
    allowNull: false,
    defaultValue: 'pendiente',
  },
}, {
  timestamps: true,  // Habilitar timestamps: createdAt y updatedAt
  hooks: {
    beforeCreate: increment,
  }
});

// Hook para auto-asignar el número de turno
const increment = async (turno) => {
  const maxTurno = await Turno.max('numeroTurno') || 0;
  turno.numeroTurno = maxTurno + 1;
};

module.exports = Turno