'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;
  const TokenManager = app.coincidents.Managers.tokenManager;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const singUp = (dataToDB) =>
    _insertUserOnDB(dataToDB)

  const _insertUserOnDB = (userData) =>
    Profile.create(userData)
    .then((info) => {
      const token = TokenManager.generate();
      const user = _structureUserObj(QueryUtils.makeObject(info));

      return {
        token,
        user
      }
    })
    .catch((err) => err)

  const _structureUserObj = (user) => {
    Reflect.set(user, 'nickName', user._id)
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, '__v');
    Reflect.deleteProperty(user, '_id');

    return user
  }

  return {
    singUp
  }
}