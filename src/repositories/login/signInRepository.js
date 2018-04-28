'use strict'

const coincidents = require('iguess-api-coincidents')

const { errorCode, errorUtils, passwordUtils, profileUtils, queryUtils } = coincidents.Utils
const { tokenManager, dateManager } = coincidents.Managers
const { boom } = errorUtils

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const singIn = (data, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    let searchQuery = {}
    const projectionQuery = {
      'friendList': 0,
      'invitedFriendList': 0
    }

    if (profileUtils.isEmail(data.login) === true) {
      searchQuery = {
        email: data.login
      }
    } else {
      searchQuery = {
        userName: data.login
      }
    }

    return _findUser(searchQuery, projectionQuery, dictionary)
      .then((userFound) => _singInJobs(data, userFound, dictionary))
      .catch((err) => err)
  }

  const _singInJobs = (data, userFound, dictionary) =>
    passwordUtils.checkPassword(data.password, userFound.password)
    .then((isMatched) => {
      if (isMatched) {
        updatelastSignIn(userFound)
        const token = tokenManager.generate()
        const structuredUser = _structureUserObj(userFound)

        return {
          token,
          user: structuredUser
        }
      }

      throw boom('unauthorized', dictionary.invalidLogin, errorCode.invalidLogin)      
    })

  const _structureUserObj = (userFound) => {
    const userObj = queryUtils.makeObject(userFound)
    Reflect.deleteProperty(userObj, 'password')
    Reflect.set(userObj, 'userRef', userObj._id.toString())
    Reflect.deleteProperty(userObj, '_id')
    
    return userObj
  }

  const _findUser = (query, projectionQuery, dictionary) =>
    Profile
    .findOne(query, projectionQuery)
    .then((userFound) => {
      if (userFound) {
        return userFound
      }
      
      throw boom('unauthorized', dictionary.invalidLogin, errorCode.invalidLogin)      
    })

  const updatelastSignIn = (user) => {
    user.lastSignInAt = dateManager.getUTCNow()
    user.save()
  }

  return {
    singIn
  }
}

/*eslint max-statements: 0*/