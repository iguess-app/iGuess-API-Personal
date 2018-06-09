'use strict'


const coincidents = require('iguess-api-coincidents')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const commonData = require('./commonData')

const cacheManager = coincidents.Managers.cacheManager

module.exports = () => {

  const validateSoftToken = async (payload, headers) => {
    const dictionary = coincidents.Translate.gate.selectLanguage(headers.language)
    
    const softTokenContent = await cacheManager.get(commonData.REDIS_PREFIX_KEY+payload.softToken)

    if (!softTokenContent) {
      //todo: criar msg e errorcode pra isso
      throw boom('badRequest', dictionary.notificationExists, errorCode.notificationExists)
    }

    return {
      name: softTokenContent.name,
      token: payload.softToken
    }
  }

  return {
    validateSoftToken
  }

}