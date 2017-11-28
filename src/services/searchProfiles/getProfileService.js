'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const getProfileRepository = app.src.repositories.searchProfiles.getProfileRepository;

  const getProfile = async (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    await sessionManager.getSession(headers.token, dictionary)

    return getProfileRepository.getProfile(request, dictionary)
  }

  return {
    getProfile
  }
};