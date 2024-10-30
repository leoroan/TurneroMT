const Sequelize = require('sequelize')
const sequelize = require('../config/db.config')

// Cargar modelos
const User = require('./User')// Importar el modelo
const Servicio = require('./Servicio')
const Turno = require('./Turno')

// Establezco las relaciones
Servicio.hasMany(Turno, { foreignKey: { allowNull: false, }, onDelete: 'CASCADE' });
Turno.belongsTo(Servicio, { foreignKey: { allowNull: false, } });

// Sincronizar la base de datos
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false, alter: true }) // Cambiar a true para forzar la recreación de tablas
    // await sequelize.sync()
    console.log('Database synced')
  } catch (error) {
    console.error('Error syncing database:', error)
  }
}

module.exports = {
  sequelize,
  syncDatabase,
  User
}
