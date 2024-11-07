// import { Router } from 'express'
// import { getAllUsers, createUser } from '../services/user.service.mjs'

// const router = Router()
const express = require('express')
const { getAllUsers, createUser } = require('../services/user.service')

const router = express.Router()

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  const users = await getAllUsers()
  res.json(users)
})

// Ruta para crear un usuario
router.post('/', async (req, res) => {
  const newUser = await createUser(req.body)
  res.json(newUser)
})

// export default router
module.exports = router
