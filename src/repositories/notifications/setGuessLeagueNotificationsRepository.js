'use Strict';

module.exports = (app) => {
  const Notifications = app.coincidents.Schemas.notificationsSchema;

  const setGuessLeagueNotifications = (userId) => {
    const searchQuery = {
      user: userId
    }

    // return Notifications.findOne(searchQuery)
    //   .then((notifications) => notifications)
    //   .catch((err) => err)
  }


  return {
    setGuessLeagueNotifications
  }
}