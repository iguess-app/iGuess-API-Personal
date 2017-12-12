'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const setGuessLeagueNotificationsRepository = app.src.repositories.notifications.setGuessLeagueNotificationsRepository;

  const setGuessLeagueNotifications = async (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers.token, dictionary)
    request.invitatorUserRef = session.userRef

    return setGuessLeagueNotificationsRepository.setGuessLeagueNotifications(request, dictionary)
  }

  return {
    setGuessLeagueNotifications
  }
};