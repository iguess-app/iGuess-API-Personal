'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;
  const Notifications = app.coincidents.Schemas.notificationsSchema;
  const TokenManager = app.coincidents.Managers.tokenManager;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const singUp = (dataToDB) =>
    _insertUserOnDB(dataToDB)

  const _insertUserOnDB = (userData) =>
    Profile.create(userData)
    .then((info) => {
      _createNotificationDocument(info);
      const token = TokenManager.generate();
      const user = _structureUserObj(QueryUtils.makeObject(info));

      return {
        token,
        user
      }
    })
    .catch((err) => {
      if (err.errors && err.errors.userName) {
        err.code = parseInt(err.errors.userName.message, 10)
      }
      if (err.errors && err.errors.name) {
        err.code = parseInt(err.errors.name.message, 10)
      }

      return err
    })

  const _structureUserObj = (user) => {
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, '__v');
    Reflect.deleteProperty(user, '_id');

    return user
  }

  const _createNotificationDocument = (userData) => {
    const notificationObj = {
      user: userData.id,
      notifications: []
    }
    Notifications.create(notificationObj)
    .catch((err) => new Error(err));
  }

  return {
    singUp
  }
}