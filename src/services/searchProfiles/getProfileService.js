'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const getProfileRepository = app.src.repositories.searchProfiles.getProfileRepository

  const getProfile = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers, dictionary)
    if (payload.self) {
      payload.userRef = session.userRef
    }

    return getProfileRepository.getProfile(payload, dictionary)
  }

  return {
    getProfile
  }
}