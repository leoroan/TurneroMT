const express = require('express')
const { getAllUsers, createUser } = require('../services/userService')

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

module.exports = router
