'use strict'

const Joi = require('joi')
const defaultHeaderSchema = require('./schemas/headers').defaultHeaderSchema
const schemas = require('./schemas/notifications')

module.exports = (app) => {
  const notificationsController = app.src.controllers.notificationsController
  const server = app.configServer

  server.route({
    path: '/notifications/list',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        notificationsController.listNotifications(request, reply)
      },
      validate: {
        query: schemas.listNotificationSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.listNotificationSchemas.response
      }
    }
  })

  server.route({
    path: '/notifications/saw',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        notificationsController.putNotificationsSaw(request, reply)
      },
      validate: {
        payload: schemas.putNotificationsSawSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.putNotificationsSawSchemas.response
      }
    }
  })

  server.route({
    path: '/notifications/response',
    method: 'PATCH',
    config: {
      handler: (request, reply) => {
        notificationsController.responseNotification(request, reply)
      },
      validate: {
        payload: schemas.responseNotificationSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.responseNotificationSchemas.response
      }
    }
  })

  server.route({
    path: '/notifications/setGuessLeagueNotifications',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        notificationsController.setGuessLeagueNotifications(request, reply)
      },
      validate: {
        payload: Joi.object({
          inviteads: Joi.array()
        }).unknown(),
        headers: defaultHeaderSchema
      }
    }
  })
}