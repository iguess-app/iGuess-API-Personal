'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const cacheManager = coincidents.Managers.cacheManager
const SESSION_TIME = coincidents.Config.redis.sessionTime

const getSession = async (token, dictionary) => {
  const session = await cacheManager.get(token)
  if (session) {
    return session
  }

  return Promise.reject(Boom.unauthorized(dictionary.sessionExpired))
}

const createSession = (singUpObj) => {
  const sessionObj = {
    userName: singUpObj.user.userName,
    userRef: singUpObj.user.userRef
  }
  //TODO: Added a hardwareFingerPrint to session too, when a frontEnd web application use this API, refactoring this validation. (Cuz there is no hardwareFingerPrint to a browser)

  return cacheManager.set(singUpObj.token, sessionObj, SESSION_TIME)
}

module.exports = {
  getSession,
  createSession
}