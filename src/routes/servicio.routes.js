// import { Router } from 'express'
// import { getAllServices, createService } from '../services/servicio.service.mjs'

// const router = Router()
const express = require('express')
const { getAllServices, createService } = require('../services/servicio.service')

const router = express.Router()
//"/api/servicios"

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  const alls = await getAllServices()
  res.json(alls)
})

// Ruta para crear un usuario
router.post('/', async (req, res) => {
  const nuevo = await createService(req.body)
  res.json(nuevo)
})

// export default router 
module.exports = router