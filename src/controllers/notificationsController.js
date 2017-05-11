'use Strict';

module.exports = (app) => {
  const notificationsServices = app.src.services.notifications;
  const listNotificationsService = notificationsServices.listNotificationsService;

  const listNotifications = (request, reply) => {
    listNotificationsService.listNotifications(request.query, request.headers)
      .then((listNotificationsResponse) => {
        reply(listNotificationsResponse)
      })
      .catch((err) => reply(err));
  }

  return {
    listNotifications
  }
}