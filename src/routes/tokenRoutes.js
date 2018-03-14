'use strict'

const defaultSessionHeaderSchema = require('./schemas/headers').defaultSessionHeaderSchema
const schemas = require('./schemas/token')

module.exports = (app) => {
  const tokenController = app.src.controllers.tokenController
  const server = app.configServer

  server.route({
    path: '/token/verify',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        tokenController.verify(request, reply)
      },
      validate: {
        query: schemas.tokenSchemas.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schemas.tokenSchemas.response
      }
    }
  })
}