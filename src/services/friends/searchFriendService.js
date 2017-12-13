'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const searchFriendRepository = app.src.repositories.friends.searchFriendRepository

  const search = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers, dictionary)
    payload.userName = session.userName
    
    return searchFriendRepository.search(payload, dictionary)
  }

  const list = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers, dictionary)
    payload.userName = session.userName
    
    return searchFriendRepository.list(payload, dictionary)
  }

  return {
    search,
    list
  }
}