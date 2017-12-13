'use strict'

const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')

const cacheManager = coincidents.Managers.cacheManager
const ProfileUtils = coincidents.Utils.profileUtils
const SESSION_TIME = coincidents.Config.redis.sessionTime

module.exports = (app) => {
  const updateInfoRepository = app.src.repositories.profileUpdates.updateInfoRepository

  const updateInfo = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers, dictionary)
    
    payload.userName = session.userName

    return updateInfoRepository.updateInfo(payload, headers)
      .then((updateData) => _updateCacheProfile(updateData, headers.token, session))
      .catch((err) => ProfileUtils.treatErrors(err, dictionary))
  }

  return {
    updateInfo
  }
}

const _updateCacheProfile = (updateData, token, session) => {
  if (updateData.modifiedData.newUserName) {
    session.newUserName = updateData.modifiedData.newUserName
  }

  cacheManager.set(token, session, SESSION_TIME)

  Reflect.deleteProperty(updateData, 'modifiedData')

  return updateData
}

/*eslint max-statements: 0*/