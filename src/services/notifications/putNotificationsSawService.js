'use strict'

module.exports = (app) => {
  const putNotificationsSawRepository = app.src.repositories.notifications.putNotificationsSawRepository;

  const putNotificationsSaw = (request, headers) =>
    putNotificationsSawRepository.putNotificationsSaw(request, headers)

  return {
    putNotificationsSaw
  }
};