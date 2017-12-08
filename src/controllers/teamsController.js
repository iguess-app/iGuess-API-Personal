'use strict'

const listLeaguesService = require('../services/teams/listLeaguesService')()
const listTeamsByLeagueService = require('../services/teams/listTeamsByLeagueService')()

module.exports = () => {

  const listLeagues = (request, reply) => {
    listLeaguesService.listLeagues(request.query, request.headers)
      .then((response) => {
        reply(response)
      })
      .catch((err) => reply(err))
  }

  const listTeamsByLeague = (request, reply) => {
    listTeamsByLeagueService.listTeamsByLeague(request.query, request.headers)
      .then((response) => {
        reply(response)
      })
      .catch((err) => reply(err))
  }

  return {
    listLeagues,
    listTeamsByLeague
  }
}