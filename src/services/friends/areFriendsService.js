'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const areFriendsRepository = app.src.repositories.friends.areFriendsRepository

  const areFriends = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers.token, dictionary)
    payload.userRef = session.userRef

    return areFriendsRepository(payload, dictionary)
  } 

  return areFriends
}