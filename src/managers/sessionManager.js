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

  return cacheManager.set(singUpObj.token, sessionObj, SESSION_TIME)
}

const destroySession = async (headers, dictionary) => {
  const session = await cacheManager.get(headers.token)
  if (session && session.hardwareFingerPrint === headers.hardware_fingerprint) {
    return cacheManager.del(headers.token)
  }

  return Promise.reject(Boom.unauthorized(dictionary.sessionExpired))
}

module.exports = {
  getSession,
  createSession,
  destroySession
}