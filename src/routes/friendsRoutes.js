'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const friendsController = app.src.controllers.friendsController;
  const server = app.configServer;

  server.route({
    path: '/friends/search',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        friendsController.search(request, reply)
      },
      validate: {
        query: Joi.object({
          searchField: Joi.string().required()
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
        }).unknown()
      }
    }
  })
};