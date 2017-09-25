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
          userRef: Joi.string().required()
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
        payload: Joi.object({
          userRef: Joi.string().required()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
          profileModified: Joi.bool().required()
        }).meta({
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
        notificationsController.responseNotification(request, reply)
      },
      validate: {
        payload: Joi.object({
          userRef: Joi.string().required(),
          notificationId: Joi.string().required(),
          accepted: Joi.bool().required()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
          notificationRemoved: Joi.bool().required(),
          notificationDataSetted: Joi.bool().required()
        }).meta({
          className: 'Response'
        })
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
          inviteads: Joi.array().required()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
          notificationsSent: Joi.bool().required()
        }).meta({
          className: 'Response'
        })
      }
    }
  })  
}