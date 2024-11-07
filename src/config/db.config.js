// import { Sequelize } from 'sequelize'
const { Sequelize } = require('sequelize')
const path = require('path');

if (!process.env.USERPROFILE) {
  throw new Error('No se puede obtener la ruta del perfil del usuario.');
}
// Obtener la ruta al directorio del escritorio del usuario en Windows
const desktopPath = path.join(process.env.USERPROFILE, 'Desktop');

// Definir el nombre y la ruta para la base de datos
const dbPath = path.join(desktopPath, 't-mt-bdd.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  // storage: './database/database.sqlite',
  logging: false
})

// export default sequelize 
module.exports = sequelize