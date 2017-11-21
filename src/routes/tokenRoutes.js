'use strict';

const defaultHeaderSchema = require('./schemas/defaultHeaderSchema')
const schemas = require('./schemas/token')

module.exports = (app) => {
  const tokenController = app.src.controllers.tokenController;
  const server = app.configServer;

  server.route({
    path: '/token/verify',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        tokenController.verify(request, reply)
      },
      validate: {
        query: schemas.tokenSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.tokenSchemas.response
      }
    }
  })
}