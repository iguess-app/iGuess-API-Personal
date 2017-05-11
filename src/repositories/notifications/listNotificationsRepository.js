'use Strict';

module.exports = (app) => {
  const Notifications = app.coincidents.Schemas.notificationsSchema;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const getNotifications = (user) => {

    const searchQuery = {
      user
    }

    return Notifications.findOne(searchQuery)
      .then((notifications) => QueryUtils.makeObject(notifications))
      .catch((err) => 
        err
        )
  }


  return {
    getNotifications
  }
}