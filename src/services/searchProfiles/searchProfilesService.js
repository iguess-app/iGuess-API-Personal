'use strict'

const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')

const translate = coincidents.Translate.gate

module.exports = (app) => {
  const searchProfilesRepository = app.src.repositories.searchProfiles.searchProfilesRepository;

  const search = async (request, headers) => {
    const dictionary = translate.selectLanguage(headers.language)
    await sessionManager.getSession(headers.token, dictionary)
    
    return searchProfilesRepository.search(request, headers)
  }

  return {
    search
  }
}