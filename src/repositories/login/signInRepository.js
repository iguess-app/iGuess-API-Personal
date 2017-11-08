'use Strict';

const Boom = require('boom');
const moment = require('moment');

module.exports = (app) => {
  const PasswordUtils = app.coincidents.Utils.passwordUtils;
  const ProfileUtils = app.coincidents.Utils.profileUtils;
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const TokenManager = app.coincidents.Managers.tokenManager;
  const Profile = app.src.models.profileModel;

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
        updatelastSignIn(userFound)
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
    const userObj = QueryUtils.makeObject(userFound)
    Reflect.deleteProperty(userObj, 'password');
    Reflect.set(userObj, 'userRef', userObj._id.toString())
    Reflect.deleteProperty(userObj, '_id');
    
    return userObj
  }

  const _findUser = (query, projectionQuery, dictionary) =>
    Profile
    .findOne(query, projectionQuery)
    .then((userFound) => {
      if (userFound) {
        return userFound;
      }

      throw Boom.unauthorized(dictionary.invalidLogin);
    })
    .catch((err) => err)

  const updatelastSignIn = (user) => {
    user.lastSignInAt = getCurrentTime()
    user.save()
  }

  const getCurrentTime = () => moment.parseZone().utc().format()

  return {
    singIn
  }
}

/*eslint max-statements: 0*/