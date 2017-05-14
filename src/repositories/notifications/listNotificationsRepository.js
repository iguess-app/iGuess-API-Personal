'use Strict';

module.exports = (app) => {
  const Notifications = app.coincidents.Schemas.notificationsSchema;

  const getNotifications = (userId) => {
    const searchQuery = {
      user: userId
    }

    return Notifications.findOne(searchQuery)
      .then((notifications) => notifications)
      .catch((err) => err)
  }


  return {
    getNotifications
  }
}