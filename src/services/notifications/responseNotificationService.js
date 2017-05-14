'use Strict';

module.exports = (app) => {
  const responseNotificationRepository = app.src.repositories.notifications.responseNotificationRepository;

  const responseNotification = (request, headers) =>
    responseNotificationRepository.responseNotification(request, headers)

  return {
    responseNotification
  }
};