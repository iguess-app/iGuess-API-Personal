'use strict'

const coincidents = require('iguess-api-coincidents')

const { errorCode, errorUtils } = coincidents.Utils
const { cacheManager } = coincidents.Managers
const { boom } = errorUtils
const SESSION_TIME = coincidents.Config.redis.sessionTime

const getSession = async (headers, dictionary) => {
  const session = await cacheManager.get(headers.token)
  if (session && session.hardwareFingerPrint === headers.hardware_fingerprint) {
    return session
  }

  return Promise.reject(boom('unauthorized', dictionary.sessionExpired, errorCode.sessionExpired))
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

  return Promise.reject(boom('unauthorized', dictionary.sessionExpired, errorCode.sessionExpired))
}

module.exports = {
  getSession,
  createSession,
  destroySession
}