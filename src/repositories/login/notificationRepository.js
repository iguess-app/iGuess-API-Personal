'use Strict';

module.exports = (app) => {
  const Notifications = app.coincidents.Schemas.notificationsSchema;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const getNotifications = (userId) => {

    const searchQuery = {
      'user': userId
    }

    return Notifications.findOne(searchQuery)
      .then((notifications) => QueryUtils.makeObject(notifications))
      .catch((err) => err)
  }


  return {
    getNotifications
  }
}