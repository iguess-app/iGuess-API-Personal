'use strict'

const coincidents = require('iguess-api-coincidents')
const sessionManager = require('../../managers/sessionManager')

const { errorCode, errorUtils, passwordUtils, profileUtils } = coincidents.Utils
const { boom } = errorUtils
const PROMISE_INDEX = 1

module.exports = (app) => {
  const signUpRepository = app.src.repositories.login.signUpRepository
  const friendsNumberRepository = app.src.repositories.friends.friendsNumberRepository

  const singUp = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    _checkRestricts(payload, dictionary)

    return passwordUtils.cryptPassword(payload.password)
      .then((cryptedPassword) => _buildNewUserObj(payload, cryptedPassword))
      .then((userToDB) => signUpRepository.singUp(userToDB))
      .then((singUpObj) => _createSessionAndBuildResponseObj(singUpObj, headers))
      .catch((err) => profileUtils.treatErrors(err, dictionary))
  }

  const _createSessionAndBuildResponseObj = (singUpObj, headers) => 
    Promise.all([sessionManager.createSession(singUpObj, headers), _structureUserObj(singUpObj)])
      .then((sessionAndResponse) => sessionAndResponse[PROMISE_INDEX])

  const _structureUserObj = (singUpObj) => 
    friendsNumberRepository.getNumberOfFriends(singUpObj.user.userName)
      .then((numberOfFriends) => {
        singUpObj.user.unreadNotification = false
        singUpObj.user.numberOfFriends = numberOfFriends

        return singUpObj
      })

  const _buildNewUserObj = (payload, cryptedPassword) => {
    payload.password = cryptedPassword
    payload.confirmedEmail = false

    return payload
  }

  const _checkRestricts = (payload, dictionary) => {
    if (passwordUtils.checkPasswordRestrict(payload.password) !== true) {
      throw boom('notAcceptable', dictionary.passwordAlert, errorCode.passwordAlert)
    }
    if (profileUtils.isEmail(payload.email) !== true) {
      throw boom('notAcceptable', dictionary.notAEmail, errorCode.notAEmail)
    }

    return payload
  }

  return {
    singUp
  }
}