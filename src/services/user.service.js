import { User } from '../models/User.model.js'

// Obtener todos los usuarios
const getAllUsers = async () => {
  try {
    return await User.findAll()
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message)
  }
}

// Crear un nuevo usuario
const createUser = async (userData) => {
  try {
    return await User.create(userData)
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message)
  }
}

export {
  getAllUsers,
  createUser
}
