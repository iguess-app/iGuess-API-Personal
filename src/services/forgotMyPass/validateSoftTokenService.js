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
      throw boom('badRequest', dictionary.softTokenExpired, errorCode.softTokenExpired)
    }

    return {
      name: softTokenContent.name,
      softToken: payload.softToken
    }
  }

  return {
    validateSoftToken
  }

}