import { Turno } from '../models/Turno.model.js'
import { Servicio } from '../models/Servicio.model.js'

const getAllTurnos = async () => {
  try {
    const turnos = await Turno.findAll()
    return turnos
  } catch (error) {
    throw new Error('Error al obtener los turnos: ' + error.message)
  }
}

const createTurno = async (servicioId) => {
  try {
    // Buscar el servicio
    const servicio = await Servicio.findByPk(servicioId);
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    // Obtener la fecha actual
    const hoy = new Date().toISOString().split('T')[0];

    // Buscar el último numeroTurno del día para este servicio
    const ultimoTurno = await Turno.findOne({
      where: { servicioId, fecha: hoy },
      order: [['numeroTurno', 'DESC']],
    });

    // Determinar el próximo numeroTurno
    const nuevoNumeroTurno = ultimoTurno ? ultimoTurno.numeroTurno + 1 : 1;

    // Crear el nuevo turno
    const nuevoTurno = await Turno.create({
      servicioId,
      numeroTurno: nuevoNumeroTurno,
      estado: 'pendiente',
      fecha: hoy,
    });

    // res.status(201).json(nuevoTurno);
    return { ...nuevoTurno, servicio: servicio.nombre };
  } catch (error) {
    console.error('Error al crear el turno:', error);
    // res.status(500).json({ error: 'Error interno del servidor' });
    throw new Error('Error al crear el turno: ' + error.message);
  }
}

export {
  getAllTurnos,
  createTurno
}