'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const responseNotificationRepository = app.src.repositories.notifications.responseNotificationRepository;

  const responseNotification = async (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers.token, dictionary)
    request.userRef = session.userRef

    return responseNotificationRepository.responseNotification(request, dictionary, headers)
  }

  return {
    responseNotification
  }
};