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
          userName: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
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