'use Strict';

module.exports = (app) => {
  const setGuessLeagueNotificationsRepository = app.src.repositories.notifications.setGuessLeagueNotificationsRepository;

  const setGuessLeagueNotifications = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    
    return setGuessLeagueNotificationsRepository.setGuessLeagueNotifications(request, dictionary)
  }

  return {
    setGuessLeagueNotifications
  }
};