'use strict'

const schema = require('./schemas/teams')
const defaultSessionHeaderSchema = require('./schemas/headers').defaultSessionHeaderSchema

module.exports = (app) => {
  const teamsController = app.src.controllers.teamsController
  const server = app.configServer

  server.route({
    path: '/teams/listLeagues',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        teamsController.listLeagues(request, reply)
      },
      validate: {
        query: schema.listLeaguesSchema.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schema.listLeaguesSchema.response
      }
    }
  })

  server.route({
    path: '/teams/listTeamsByLeague',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        teamsController.listTeamsByLeague(request, reply)
      },
      validate: {
        query: schema.listTeamsByLeagueSchema.request,
        headers: defaultSessionHeaderSchema
      },
      response: {
        schema: schema.listTeamsByLeagueSchema.response
      }
    }
  })

}