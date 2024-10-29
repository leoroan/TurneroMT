const { User } = require('../models')

// Obtener todos los usuarios
const getAllUsers = async () => {
  return await User.findAll()
}

// Crear un nuevo usuario
const createUser = async (userData) => {
  return await User.create(userData)
}

module.exports = {
  getAllUsers,
  createUser
}
