'use strict'

const consign = require('consign')
const coincidents = require('iguess-api-coincidents')

const plugins = require('./config/plugins/serverPlugins')

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

app.configServer.register(plugins, () => {
  app.configServer.start((err) => {
    if (err) {
      throw err
    }
  })
})

module.exports = app