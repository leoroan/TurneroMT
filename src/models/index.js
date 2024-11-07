import Sequelize from 'sequelize'
import sequelize from '../config/db.config.js'

import { Servicio } from './Servicio.model.js'
import { Turno } from './Turno.model.js'
import { User } from './User.model.js'

// Establezco las relaciones
Servicio.hasMany(Turno, { foreignKey: 'servicioId', as: 'turnos' });
Turno.belongsTo(Servicio, { foreignKey: 'servicioId', as: 'servicio' });

// Sincronizar la base de datos
const syncDatabase = async () => {
  try {
    // await sequelize.sync({ force: true, alter: true }) // Cambiar a true para forzar la recreación de tablas
    await sequelize.sync()
    console.log('Database synced')
  } catch (error) {
    console.error('Error syncing database:', error)
  }
}

export {
  sequelize,
  syncDatabase,
  User,
  Turno,
  Servicio
}
