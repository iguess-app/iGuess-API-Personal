'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const updateSupportedTeamRepository = app.src.repositories.profileUpdates.updateSupportedTeamRepository;

  const updateSupportedTeam = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers.token, dictionary)
    payload.userName = session.userName
    
    return updateSupportedTeamRepository.updateSupportedTeam(payload, headers)
  }

  return {
    updateSupportedTeam
  }
}