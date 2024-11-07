import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

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

export { Servicio }