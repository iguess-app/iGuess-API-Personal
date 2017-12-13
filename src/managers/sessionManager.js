'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const cacheManager = coincidents.Managers.cacheManager
const SESSION_TIME = coincidents.Config.redis.sessionTime

const getSession = async (headers, dictionary) => {
  const session = await cacheManager.get(headers.token)
  if (session && session.hardwareFingerPrint === headers.hardware_fingerprint) {
    return session
  }

  return Promise.reject(Boom.unauthorized(dictionary.sessionExpired))
}

const createSession = (singUpObj, headers) => {
  const sessionObj = {
    userName: singUpObj.user.userName,
    userRef: singUpObj.user.userRef,
    hardwareFingerPrint: headers.hardware_fingerprint
  }
  //TODO: Added a hardwareFingerPrint to session too, when a frontEnd web application use this API, refactoring this validation. (Cuz there is no hardwareFingerPrint to a browser)

  return cacheManager.set(singUpObj.token, sessionObj, SESSION_TIME)
}

module.exports = {
  getSession,
  createSession
}