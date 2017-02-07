'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const Profile = app.src.schemas.profileSchema;
  const PasswordUtils = app.src.utils.passwordUtils;
  const QueryUtils = app.src.utils.queryUtils;

  const singUp = (dataToDB) =>
    _insertUserOnDB(dataToDB)

  const singIn = (data, header) => _findByEmail(data.email)
    .then((userFounded) => PasswordUtils.checkPassword(data.password, userFounded.password))

  const _insertUserOnDB = (userData) =>
    Promise.resolve(Profile.create(userData)
      .then(() => ({
        singUpSuccess: true
      }))
      .catch((err) => err)
    )

  const _findByEmail = (email) =>
    Promise.resolve(Profile.findOne({
        email
      })
      .then((result) => QueryUtils.makeObject(result))
      .catch((err) => err)
    )

  return {
    singUp,
    singIn
  }
}