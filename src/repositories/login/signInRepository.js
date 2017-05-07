'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const PasswordUtils = app.coincidents.Utils.passwordUtils;
  const ProfileUtils = app.coincidents.Utils.profileUtils;
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const TokenManager = app.coincidents.Managers.tokenManager;
  const Profile = app.coincidents.Schemas.profileSchema;

  const singIn = (data, header) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(header.language);
    let searchQuery = {};

    if (ProfileUtils.isEmail(data.login) === true) {
      searchQuery = {
        email: data.login
      };
    } else {
      searchQuery = {
        userName: data.login
      };
    }

    return _findUser(searchQuery, dictionary)
      .then((userFound) => _singInJobs(data, userFound, dictionary))
      .catch((err) => err)
  }

  const _singInJobs = (data, userFound, dictionary) =>
    PasswordUtils.checkPassword(data.password, userFound.password)
    .then((isMatched) => {
      if (isMatched) {
        const token = TokenManager.generate();
        const structuredUser = _structureUserObj(userFound);

        return {
          token,
          user: structuredUser
        }
      }

      throw Boom.unauthorized(dictionary.invalidLogin);
    })

  const _structureUserObj = (userFound) => {
    Reflect.deleteProperty(userFound, 'password');
    Reflect.deleteProperty(userFound, '__v');
    Reflect.set(userFound, 'id', userFound._id.toString())
    Reflect.deleteProperty(userFound, '_id');

    return userFound
  }

  const _findUser = (query, dictionary) =>
    Profile
    .findOne(query)
    .then((userFound) => {
      if (userFound) {
        return QueryUtils.makeObject(userFound);
      }

      throw Boom.unauthorized(dictionary.invalidLogin);
    })
    .catch((err) => err)

  return {
    singIn
  }
}