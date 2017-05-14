'use Strict';

module.exports = (app) => {
  const Notifications = app.coincidents.Schemas.notificationsSchema;

  const getNotifications = (user) => {

    const searchQuery = {
      user
    }

    return Notifications.findOne(searchQuery)
      .then((notifications) => notifications)
      .catch((err) => err)
  }


  return {
    getNotifications
  }
}