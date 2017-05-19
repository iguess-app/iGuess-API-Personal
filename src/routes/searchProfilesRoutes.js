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
          language: Joi.string().default('en-us')
        }).unknown()
      }
    }
  })

  server.route({
    path: '/profiles/getProfile',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        searchProfilesController.getProfile(request, reply)
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
        schema: Joi.object({
          userName: Joi.string().required(),
          email: Joi.string().required(),
          guessesLeagues: Joi.array().required(),
          guessesLines: Joi.array().required(),
          userId: Joi.string().required(),
          footballSupportedTeams: Joi.object({
            appreciatedTeams: Joi.array(),
            supportedTeam: Joi.array()
          }).required(),
          numberOfFriends: Joi.number().required()

        }).meta({
          className: 'Response'
        })
      }
    }
  })
};