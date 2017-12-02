'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')
const sessionManager = require('../../managers/sessionManager')

const PasswordUtils = coincidents.Utils.passwordUtils
const ProfileUtils = coincidents.Utils.profileUtils

module.exports = (app) => {
  const signUpRepository = app.src.repositories.login.signUpRepository
  const friendsNumberRepository = app.src.repositories.friends.friendsNumberRepository

  const singUp = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    _checkRestricts(payload, dictionary)

    return PasswordUtils.cryptPassword(payload.password)
      .then((cryptedPassword) => _buildNewUserObj(payload, cryptedPassword))
      .then((userToDB) => signUpRepository.singUp(userToDB))
      .then((singUpObj) => _createSessionAndBuildResponseObj(singUpObj))
      .catch((err) => ProfileUtils.treatErrors(err, dictionary))
  }

  const _createSessionAndBuildResponseObj = (singUpObj) => 
    Promise.all([sessionManager.createSession(singUpObj), _structureUserObj(singUpObj)])
      .then((sessionAndResponse) => sessionAndResponse[1])

  const _structureUserObj = (singUpObj) => 
    friendsNumberRepository.getNumberOfFriends(singUpObj.user.userName)
      .then((numberOfFriends) => {
        singUpObj.user.unreadableNotification = false
        singUpObj.user.numberOfFriends = numberOfFriends

        return singUpObj
      })

  const _buildNewUserObj = (payload, cryptedPassword) => {
    payload.password = cryptedPassword
    payload.confirmedEmail = false

    return payload
  }

  const _checkRestricts = (payload, dictionary) => {
    if (PasswordUtils.checkPasswordRestrict(payload.password) !== true) {
      throw Boom.notAcceptable(dictionary.passwordAlert)
    }
    if (ProfileUtils.isEmail(payload.email) !== true) {
      throw Boom.notAcceptable(dictionary.notAEmail)
    }

    return payload
  }

  return {
    singUp
  }
}