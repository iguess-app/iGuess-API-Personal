'use Strict';

const Boom = require('Boom');

module.exports = (app) => {
  const PasswordUtils = app.src.utils.passwordUtils;
  const QueryUtils = app.src.utils.queryUtils;
  const TokenManager = app.src.managers.tokenManager;
  const Profile = app.src.schemas.profileSchema;

  const singIn = (data, header) => {
    const dictionary = app.src.translate.gate.selectLanguage(header.language);
    let searchQuery = {};

    if (isEmail(data.login)) {
      searchQuery = {
        email: data.login
      };
    } else {
      searchQuery = {
        _id: data.login
      };
    }

    return _findUser(searchQuery, dictionary)
      .then((userFounded) => _singInJobs(data, userFounded, dictionary))
      .catch((err) => err)
  }

  const isEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);
  }

  const _singInJobs = (data, userFounded, dictionary) =>
    PasswordUtils.checkPassword(data.password, userFounded.password)
    .then((isMatched) => {
      if (isMatched) {
        const token = TokenManager.generate();
        const structuredUser = _structureUserObj(userFounded);

        return {
          token,
          user: structuredUser
        }
      }

      throw Boom.unauthorized(dictionary.invalidLogin);
    })
    .catch((err) => Boom.unauthorized(err))

  const _structureUserObj = (userFounded) => {
    Reflect.set(userFounded, 'nickName', userFounded._id)
    Reflect.deleteProperty(userFounded, 'password');
    Reflect.deleteProperty(userFounded, '__v');
    Reflect.deleteProperty(userFounded, '_id');

    return userFounded
  }

  const _findUser = (query, dictionary) =>
    Profile
    .findOne(query)
    .then((userFounded) => {
      if (userFounded) {
        return QueryUtils.makeObject(userFounded);
      }

      throw Boom.unauthorized(dictionary.invalidLogin);
    })
    .catch((err) => err)

  return {
    singIn
  }
}