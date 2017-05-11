'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const searchProfilesController = app.src.controllers.searchProfilesController;
  const server = app.configServer;

  server.route({
    path: '/profiles/search',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        searchProfilesController.search(request, reply)
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