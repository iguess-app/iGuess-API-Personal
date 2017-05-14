'use Strict';

module.exports = (app) => {
  const notificationsServices = app.src.services.notifications;
  const listNotificationsService = notificationsServices.listNotificationsService;
  const putNotificationsSawService = notificationsServices.putNotificationsSawService;

  const listNotifications = (request, reply) => {
    listNotificationsService.listNotifications(request.query, request.headers)
      .then((listNotificationsResponse) => {
        reply(listNotificationsResponse)
      })
      .catch((err) => reply(err));
  }

  const putNotificationsSaw = (request, reply) => {
    putNotificationsSawService.putNotificationsSaw(request.payload, request.headers)
      .then((response) => {
        reply(response)
      })
      .catch((err) => reply(err));
  }

  return {
    listNotifications,
    putNotificationsSaw
  }
}