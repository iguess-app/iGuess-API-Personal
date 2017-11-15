'use strict'

const defaultHeaderSchema = require('./schemas/defaultHeaderSchema')
const loginSchemas = require('./schemas/login')

module.exports = (app) => {
  const loginController = app.src.controllers.loginController
  const server = app.configServer

  server.route({
    path: '/login/singup',
    method: 'POST',
    config: {
      handler: (request, reply) => {
        loginController.singUp(request, reply)
      },
      validate: {
        payload: loginSchemas.signUpSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: loginSchemas.signUpSchemas.response
      }
    }
  })

  server.route({
    path: '/login/singin',
    method: 'POST',
    config: {
      handler: (request, reply) => {
        loginController.singIn(request, reply)
      },
      validate: {
        payload: loginSchemas.signInSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: loginSchemas.signInSchemas.response
      }
    }
  })

}