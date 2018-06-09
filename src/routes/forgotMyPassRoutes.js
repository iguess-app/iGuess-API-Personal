'use strict'

const defaultHeaderSchema = require('./schemas/headers').defaultHeaderSchema
const forgotMyPassSchemas = require('./schemas/forgotMyPass')

module.exports = (app) => {
  const forgotMyPassController = app.src.controllers.forgotMyPassController
  const server = app.configServer

  server.route({
    path: '/forgotMyPass/sendEmail',
    method: 'POST',
    config: {
      handler: (request, reply) => {
        forgotMyPassController.sendEmail(request, reply)
      },
      validate: {
        payload: forgotMyPassSchemas.sendEmailSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: forgotMyPassSchemas.sendEmailSchemas.response
      }
    }
  })

}