const Sequelize = require('sequelize')
const sequelize = require('../config/db.config')

// Cargar modelos
const User = require('./User.model')// Importar el modelo
const Turno = require('./Turno.model')
const Servicio = require('./Servicio.model')

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

module.exports = {
  sequelize,
  syncDatabase,
  User,
  Turno,
  Servicio
}
