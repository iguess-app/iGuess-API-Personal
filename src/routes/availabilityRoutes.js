'use strict';

const schema = require('./schemas/availability')
const defaultHeaderSchema = require('./schemas/defaultHeaderSchema')

module.exports = (app) => {
  const availabilityController = app.src.controllers.availabilityController;
  const server = app.configServer;

  server.route({
    path: '/availability/userName',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        availabilityController.userNameAvailability(request, reply)
      },
      validate: {
        query: schema.userNameAvailabilitySchema.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schema.userNameAvailabilitySchema.response
      }
    }
  })

  server.route({
    path: '/availability/email',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        availabilityController.emailAvailability(request, reply)
      },
      validate: {
        query: schema.emailAvailabilitySchema.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schema.emailAvailabilitySchema.response
      }
    }
  })
};