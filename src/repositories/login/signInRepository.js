'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const PasswordUtils = app.coincidents.Utils.passwordUtils;
  const ProfileUtils = app.coincidents.Utils.profileUtils;
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const TokenManager = app.coincidents.Managers.tokenManager;
  const Profile = app.coincidents.Schemas.profileSchema;

  const singIn = (data, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    let searchQuery = {};
    const projectionQuery = {
      'friendList': 0,
      'invitedFriendList': 0
    }

    if (ProfileUtils.isEmail(data.login) === true) {
      searchQuery = {
        email: data.login
      };
    } else {
      searchQuery = {
        userName: data.login
      };
    }

    return _findUser(searchQuery, projectionQuery, dictionary)
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
    if (userFound.footballSupportedTeams) {
      Reflect.deleteProperty(userFound.footballSupportedTeams.supportedTeam, '_id');
      userFound.footballSupportedTeams.appreciatedTeams.map((appreciatedTeam) => {
        Reflect.deleteProperty(appreciatedTeam, '_id');

        return appreciatedTeam;
      })
    }

    return userFound
  }

  const _findUser = (query, projectionQuery, dictionary) =>
    Profile
    .findOne(query, projectionQuery)
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