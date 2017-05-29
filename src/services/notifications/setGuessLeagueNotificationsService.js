'use Strict';

module.exports = (app) => {
  const setGuessLeagueNotificationsRepository = app.src.repositories.notifications.setGuessLeagueNotificationsRepository;

  const setGuessLeagueNotifications = (request, headers) =>
    setGuessLeagueNotificationsRepository.setGuessLeagueNotifications(request, headers)

  return {
    setGuessLeagueNotifications
  }
};