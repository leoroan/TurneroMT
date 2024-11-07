import { Router } from 'express'
import { getAllTurnos, createTurno } from '../services/turno.service.js'

const router = Router()

//"/api/turnos"

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  const alls = await getAllTurnos()
  res.json(alls)
})

// Ruta para crear un usuario
router.post('/:servicioId', async (req, res) => {
  const { servicioId } = req.params;
  const nuevo = await createTurno(servicioId)
  res.json(nuevo)
})

export default router 