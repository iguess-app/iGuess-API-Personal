'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const putNotificationsSawRepository = app.src.repositories.notifications.putNotificationsSawRepository;

  const putNotificationsSaw = async (headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers, dictionary)

    return putNotificationsSawRepository.putNotificationsSaw(session, headers)
  }

  return {
    putNotificationsSaw
  }
};