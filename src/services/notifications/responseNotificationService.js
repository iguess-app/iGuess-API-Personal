'use Strict';

module.exports = (app) => {
  const responseNotificationRepository = app.src.repositories.notifications.responseNotificationRepository;

  const responseNotification = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return responseNotificationRepository.responseNotification(request, dictionary)
  }

  return {
    responseNotification
  }
};