'use strict'

const Boom = require('boom')

const Team = require('../../models/holiDB/teamModel')

module.exports = () => {

  const listTeamsByLeague = (request, dictionary) => {
    const searchQuery = {
      league: request.leagueRef
    }

    const sortQuery = {
      shortName: 1
    }

    return Team.find(searchQuery).sort(sortQuery)
      .then((teams) => _checkErrors(teams, dictionary))
      .then((teams) => _filteringResponse(teams))
  }

  return {
    listTeamsByLeague
  }
}

const _checkErrors = (teams, dictionary) => {
  if (!teams.length) {
    throw Boom.notFound(dictionary.noTeamForThisLeague)
  }

  return teams
}

const _filteringResponse = (teams) =>
  teams.map((team) => {
    team = team.toJSON()
    team.teamRef = team._id.toString()
    Reflect.deleteProperty(team, 'apiFootballName')
    Reflect.deleteProperty(team, '_id')

    return team
  })

/*eslint no-param-reassign:0 */