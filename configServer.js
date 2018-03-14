'use strict'

const Hapi = require('hapi')

module.exports = (app) => {
  const config = app.coincidents.Config

  const server = new Hapi.Server()
  server.connection({
    host: '0.0.0.0',
    port: config.serverPort
  })

  return server
}