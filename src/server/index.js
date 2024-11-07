import { app } from './app.js'
import { syncDatabase } from '../models/index.js'
import { port } from '../config/server.config.js'

// Sincronizar la base de datos y luego iniciar el servidor
syncDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})
