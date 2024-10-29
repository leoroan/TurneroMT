const Sequelize = require('sequelize')
const sequelize = require('../config/db.config')

// Cargar modelos
const User = require('./User')// Importa el modelo User, puedes agregar más modelos

// Sincronizar la base de datos
const syncDatabase = async () => {
  try {
    // await sequelize.sync({ force: false, alter: true }) // Cambia a true para forzar la recreación de tablas
    await sequelize.sync()
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
