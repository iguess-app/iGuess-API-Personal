'use strict'

const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')
const listLeaguesRepository = require('../../repositories/teams/listLeaguesRepository')()

module.exports = () => {

  const listLeagues = async (payload, headers) => {
    const dictionary = coincidents.Translate.gate.selectLanguage(headers.language)
    await sessionManager.getSession(headers.token, dictionary)

    return listLeaguesRepository.listLeagues(payload, dictionary)
  }

  return {
    listLeagues
  }
}