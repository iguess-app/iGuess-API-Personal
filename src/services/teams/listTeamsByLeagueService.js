'use strict'

const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')
const listTeamsByLeagueRepository = require('../../repositories/teams/listTeamsByLeagueRepository')()

module.exports = () => {

  const listTeamsByLeague = async (payload, headers) => {
    const dictionary = coincidents.Translate.gate.selectLanguage(headers.language)
    await sessionManager.getSession(headers.token, dictionary)

    return listTeamsByLeagueRepository.listTeamsByLeague(payload, dictionary)
  }

  return {
    listTeamsByLeague
  }
}