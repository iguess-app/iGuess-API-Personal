'use Strict';

module.exports = (app) => {
  const Notifications = app.src.models.notificationsModel;

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