'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const undoFriendShipRepository = app.src.repositories.friends.undoFriendShipRepository

  const undoFriendship = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers, dictionary)
    payload.userName = session.userName

    return undoFriendShipRepository.undoFriendship(payload, dictionary)
  }

  return {
    undoFriendship
  }
}