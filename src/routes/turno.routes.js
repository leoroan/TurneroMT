// import { Router } from 'express'
// import { getAllTurnos, createTurno } from '../services/turno.service.mjs'

// const router = Router()
const express = require('express')
const printer = require('node-printer')
const { getAllTurnos, createTurno } = require('../services/turno.service')

const router = express.Router()

//"/api/turnos"

// Ruta para obtener todos los turnos
router.get('/', async (req, res) => {
  const alls = await getAllTurnos()
  res.json(alls)
})

// Ruta para crear un turno
router.post('/:servicioId', async (req, res) => {
  const { servicioId } = req.params;

  const nuevo = await createTurno(servicioId)

  const textToPrint = `
    🎟 Turnero MT 🎟
    Servicio: ${nuevo.servicio}
    N° Turno: ${nuevo.numeroTurno}
    Fecha: ${nuevo.fecha}
  `;

 try {
    // Obtener el nombre de la impresora predeterminada
    const defaultPrinter = printer.getDefaultPrinterName();

    if (!defaultPrinter) {
      return res.status(500).json({ message: 'No se encontró la impresora predeterminada.' });
    }

    // Imprimir directamente en la impresora predeterminada
    printer.printDirect({
      data: textToPrint,
      printer: defaultPrinter, // Usar la impresora predeterminada
      type: 'TEXT', // Definir el tipo de datos
      success: function(jobID) {
        res.status(200).json({ message: 'Turno impreso correctamente', nuevo });
      },
      error: function(err) {
        console.error('Error al imprimir:', err);
        res.status(500).json({ message: 'Error al imprimir el turno' });
      }
    });

  } catch (error) {
    console.error('Error al imprimir:', error);
    res.status(500).json({ message: 'Error al imprimir el turno' });
  }
})

// export default router 
module.exports = router