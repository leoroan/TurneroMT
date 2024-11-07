// import { Servicio } from '../models/Servicio.model.mjs'
const { Servicio } = require('../models')

const getAllServices = async () => {
  try {
    const services = await Servicio.findAll()
    return services
  } catch (error) {
    throw new Error('Error al obtener los servicios: ' + error.message)
  }
}

const createService = async (data) => {
  try {
    const newService = await Servicio.create(data)
    return newService
  } catch (error) {
    throw new Error('Error al crear el servicio: ' + error.message)
  }
}

// export {
//   getAllServices,
//   createService
// }
module.exports = {
  getAllServices,
  createService
}