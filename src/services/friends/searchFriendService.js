'use strict'

module.exports = (app) => {
  const searchFriendRepository = app.src.repositories.friends.searchFriendRepository

  const search = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return searchFriendRepository.search(request, dictionary)
  }

  const list = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return searchFriendRepository.list(request, dictionary)
  }

  return {
    search,
    list
  }
}