'use Strict';

module.exports = (app) => {
  const notificationsServices = app.src.services.notifications;
  const listNotificationsService = notificationsServices.listNotificationsService;
  const putNotificationsSawService = notificationsServices.putNotificationsSawService;
  const responseNotificationService = notificationsServices.responseNotificationService;
  const setGuessLeagueNotificationsService = notificationsServices.setGuessLeagueNotificationsService;

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

  const responseNotification = (request, reply) => {
    responseNotificationService.responseNotification(request.payload, request.headers)
      .then((response) => {
        reply(response)
      })
      .catch((err) => reply(err));
  }

  const setGuessLeagueNotifications = (request, reply) => {
    setGuessLeagueNotificationsService.setGuessLeagueNotifications(request.payload, request.headers)
      .then((response) => {
        reply(response)
      })
      .catch((err) => 
        reply(err)
      );
  }

  return {
    listNotifications,
    putNotificationsSaw,
    responseNotification,
    setGuessLeagueNotifications
  }
}