import { Router } from 'express'
import { getAllUsers, createUser } from '../services/user.service.js'

const router = Router()

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

export default router
