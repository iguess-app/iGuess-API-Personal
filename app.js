'use strict'

const consign = require('consign')
const app = {}
app.coincidents = require('iguess-api-coincidents')

consign()
  .include('configServer.js')
  .include('src/models')
  .include('src/repositories')
  .include('src/services')
  .include('src/controllers')
  .include('src/routes/schemas')
  .include('src/routes')
  .into(app)

app.configServer.start((err) => {
  if (err) {
    throw err
  }

  app.coincidents.Managers.logManager.info(`Server running at ${app.configServer.info.uri}`)
})

module.exports = app