'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const Profile = app.src.schemas.profileSchema;

  const singUp = (dataToDB) =>
    _insertUserOnDB(dataToDB)

  const _insertUserOnDB = (userData) => 
    Promise.resolve(Profile.create(userData)
      .then(() => ({ singUpSuccess: true }))
      .catch((err) => err)
    )

  return { singUp }
}