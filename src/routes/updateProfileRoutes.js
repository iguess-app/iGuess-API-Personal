'use strict'

const schemas = require('./schemas/updateProfile')
const defaultHeaderSchema = require('./schemas/defaultHeaderSchema')

module.exports = (app) => {
  const updateProfileController = app.src.controllers.updateProfileController
  const server = app.configServer

  server.route({
    path: '/profile/updateInfo',
    method: 'PATCH',
    config: {
      handler: (request, reply) => {
        updateProfileController.updateInfo(request, reply)
      },
      validate: {
        payload: schemas.updateInfoSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.updateInfoSchemas.response
      }
    }
  })

  server.route({
    path: '/profile/updatePassword',
    method: 'PATCH',
    config: {
      handler: (request, reply) => {
        updateProfileController.updatePassword(request, reply)
      },
      validate: {
        payload: schemas.updatePasswordSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.updatePasswordSchemas.response
      }
    }
  })

  server.route({
    path: '/profile/updateAvatar',
    method: 'PATCH',
    config: {
      handler: (request, reply) => {
        updateProfileController.updatePassword(request, reply)
      },
      validate: {
        payload: schemas.updateAvatarSchemas.request,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.updateAvatarSchemas.response
      }
    }
  })

  server.route({
    path: '/profile/updateFootballSupportedTeams/supportedTeam',
    method: 'PATCH',
    config: {
      handler: (request, reply) => {
        updateProfileController.updateSupportedTeam(request, reply)
      },
      validate: {
        payload: schemas.updateTeamsSchemas.supportedTeamRequest,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.updateTeamsSchemas.response
      }
    }
  })

  server.route({
    path: '/profile/updateFootballSupportedTeams/appreciatedTeams',
    method: 'PATCH',
    config: {
      handler: (request, reply) => {
        updateProfileController.updateAppreciatedTeams(request, reply)
      },
      validate: {
        payload: schemas.updateTeamsSchemas.appreciatedTeamsRequest,
        headers: defaultHeaderSchema
      },
      response: {
        schema: schemas.updateTeamsSchemas.response
      }
    }
  })
}