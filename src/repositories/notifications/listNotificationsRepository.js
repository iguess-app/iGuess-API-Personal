'use Strict';

module.exports = (app) => {
  const Notifications = app.coincidents.Schemas.notificationsSchema;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const getNotifications = (user) => {

    const searchQuery = {
      user
    }

    return Notifications.findOne(searchQuery)
      .then((notifications) => {
        if (notifications) {
          return QueryUtils.makeObject(notifications)
        }

        return null;
      })
      .catch((err) =>
        err
      )
  }


  return {
    getNotifications
  }
}