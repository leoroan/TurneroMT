// import express, { json } from 'express';
// import cors from 'cors';
// import userRoutes from '../routes/user.routes.mjs';
// import turnoRoutes from '../routes/turno.routes.mjs';
// import serviceRoutes from '../routes/servicio.routes.mjs';

// const app = express()
const express = require('express')
const cors = require('cors');
const userRoutes = require('../routes/user.routes')
const turnoRoutes = require('../routes/turno.routes')
const serviceRoutes = require('../routes/servicio.routes')

const app = express()

// Middlewares
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173', // Origen permitido
}));

// Rutas
app.use('/api/users', userRoutes)
app.use('/api/turnos', turnoRoutes)
app.use('/api/servicios', serviceRoutes)

// export { app }
module.exports = app