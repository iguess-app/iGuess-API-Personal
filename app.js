'use strict'

const consign = require('consign')
const coincidents = require('iguess-api-coincidents')
const app = { coincidents }

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

  app.coincidents.Managers.log.info(`Server running at ${app.configServer.info.uri}`)
})

module.exports = app