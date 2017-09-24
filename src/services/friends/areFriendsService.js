'use strict'

module.exports = (app) => {
  const areFriendsRepository = app.src.repositories.friends.areFriendsRepository

  const areFriends = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return areFriendsRepository(request, dictionary)
  } 

  return areFriends
}