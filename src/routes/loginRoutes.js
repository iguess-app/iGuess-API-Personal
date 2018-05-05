'use strict'

const defaultHeaderSchema = require('./schemas/headers').defaultHeaderSchema
const defaultSessionHeaderSchema = require('./schemas/headers').defaultSessionHeaderSchema
const loginSchemas = require('./schemas/login')

module.exports = (app) => {
  const loginController = app.src.controllers.loginController
  const server = app.configServer

  server.route({
    path: '/login/signup',
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
    path: '/login/signin',
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

  server.route({
    path: '/login/logout',
    method: 'DELETE',
    config: {
      handler: (request, reply) => {
        loginController.logout(request, reply)
      },
      validate: {
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: loginSchemas.logoutSchemas.response
      }
    }
  })
}