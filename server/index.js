const app = require('./app')
const { syncDatabase } = require('../models')
const { port } = require('../config/server.config')

// Sincronizar la base de datos y luego iniciar el servidor
syncDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})
