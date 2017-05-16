'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const updateProfileController = app.src.controllers.updateProfileController;
  const server = app.configServer;
  const maxTeamToAppreciateAllowed = app.coincidents.Config.maxTeamToAppreciateAllowed;

  server.route({
    path: '/profile/updateInfo',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        updateProfileController.updateInfo(request, reply)
      },
      validate: {
        payload: Joi.object({
          userName: Joi.string().required(),
          newUserName: Joi.string(),
          name: Joi.string(),
          description: Joi.string().allow(''),
          email: Joi.string().allow('')
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
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
        updateProfileController.updatePassword(request, reply)
      },
      validate: {
        payload: Joi.object({
          oldPassword: Joi.string().required(),
          newPassword: Joi.string().required(),
          userName: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
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
        updateProfileController.updatePassword(request, reply)
      },
      validate: {
        payload: Joi.object({
          avatarFile: Joi.string().required(),
          userName: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
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
    path: '/profile/updateFootballSupportedTeams/supportedTeam',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        updateProfileController.updateSupportedTeam(request, reply)
      },
      validate: {
        payload: Joi.object({
          supportedTeamId: Joi.string().required(),
          userName: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
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
    path: '/profile/updateFootballSupportedTeams/appreciatedTeams',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        updateProfileController.updateAppreciatedTeams(request, reply)
      },
      validate: {
        payload: Joi.object({
          appreciatedTeamsId: Joi.array().required().max(maxTeamToAppreciateAllowed),
          userName: Joi.string()
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
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