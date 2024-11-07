import express, { json } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user.routes.js';
import turnoRoutes from '../routes/turno.routes.js';
import serviceRoutes from '../routes/servicio.routes.js';

const app = express()

// Middlewares
app.use(json())

app.use(cors({
  origin: 'http://localhost:5173', // Origen permitido
}));

// Rutas
app.use('/api/users', userRoutes)
app.use('/api/turnos', turnoRoutes)
app.use('/api/servicios', serviceRoutes)

export { app }
