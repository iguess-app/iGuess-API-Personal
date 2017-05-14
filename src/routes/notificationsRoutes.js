'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const notificationsController = app.src.controllers.notificationsController;
  const server = app.configServer;

  server.route({
    path: '/notifications/list',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        notificationsController.listNotifications(request, reply)
      },
      validate: {
        query: Joi.object({
          userId: Joi.string().required()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.array().items(Joi.object({
          notificationId: Joi.string(),
          message: Joi.string().required(),
          guessLeague: Joi.string(),
          profile: Joi.string(),
          avatar: Joi.string()
        })).meta({
          className: 'Response'
        })
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
        query: Joi.object({
          userName: Joi.string().required()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.array().meta({
          className: 'Response'
        })
      }
    }
  })

  server.route({
    path: '/notifications/response',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        notificationsController.putNotificationsSaw(request, reply)
      },
      validate: {
        query: Joi.object({
          userName: Joi.string().required(),
          notificationId: Joi.string().required()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.array().meta({
          className: 'Response'
        })
      }
    }
  })
}