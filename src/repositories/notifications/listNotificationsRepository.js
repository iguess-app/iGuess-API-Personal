'use Strict';

module.exports = (app) => {
  const Notifications = app.src.models.notificationsModel;

  const getNotifications = (userRef) => {
    const searchQuery = {
      userRef
    }

    return Notifications.findOne(searchQuery)
      .then((notifications) => notifications)
      .catch((err) => err)
  }


  return {
    getNotifications
  }
}