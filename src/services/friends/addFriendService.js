'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const addFriendRepository = app.src.repositories.friends.addFriendRepository

  const addFriend = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers.token, dictionary)
    payload.userName = session.userName

    return addFriendRepository.addFriend(payload, headers)
  }

  return {
    addFriend
  }
}