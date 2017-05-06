'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const profileController = app.src.controllers.profileController;
  const server = app.configServer;
  const maxTeamToSupportAllowed = app.coincidents.Config.maxTeamToSupportAllowed;

  server.route({
    path: '/profile/updateInfo',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        profileController.updateInfo(request, reply)
      },
      validate: {
        payload: Joi.object({
          userName: Joi.string().required(),
          name: Joi.string(),
          description: Joi.string().allow(''),
          email: Joi.string().allow(''),
          guessesLines: Joi.array().empty(),
          teamsSupported: Joi.array().empty().max(maxTeamToSupportAllowed),
          notifications: Joi.array(),
          guessesLeagues: Joi.array(),
          friendList: Joi.array()
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
            profileModified: Joi.bool().required()
          }).unknown()
          .meta({
            className: 'Response'
          })
      }
    }
  })

  server.route({
    path: '/profile/updatePassword',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        profileController.updatePassword(request, reply)
      },
      validate: {
        payload: Joi.object({
          oldPassword: Joi.string().required(),
          newPassword: Joi.string().required(),
          userName: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
          //token: Joi.string().token().required()
        }).unknown()
      },
      response: {
        schema: Joi.object({
            profileModified: Joi.bool().required()
          }).unknown()
          .meta({
            className: 'Response'
          })
      }
    }
  })

  server.route({
    path: '/profile/updateAvatar',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        profileController.updatePassword(request, reply)
      },
      validate: {
        payload: Joi.object({
          avatarFile: Joi.string().required(),
          userName: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().required().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
            profileModified: Joi.bool().required()
          }).unknown()
          .meta({
            className: 'Response'
          })
      }
    }
  })

}