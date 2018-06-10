'use strict'


const coincidents = require('iguess-api-coincidents')

const { errorCode, errorUtils, passwordUtils } = coincidents.Utils
const { boom } = errorUtils

const commonData = require('./commonData')
const updatePasswordRepository = require('../../repositories/profileUpdates/updatePasswordRepository')()

const cacheManager = coincidents.Managers.cacheManager

module.exports = () => {

  const updateNewPassword = async (payload, headers) => {
    const dictionary = coincidents.Translate.gate.selectLanguage(headers.language)
    const softTokenContent = await cacheManager.get(commonData.REDIS_PREFIX_KEY+payload.softToken)

    _checkErrors(payload, softTokenContent, dictionary)

    const flagForgotToRepository = {
      updateByForgotService: true
    }
    
    payload.newPassword = await passwordUtils.cryptPassword(payload.newPassword)
    const updatedProfile = await updatePasswordRepository.updatePassword(Object.assign(flagForgotToRepository, payload, softTokenContent))
    await cacheManager.del(commonData.REDIS_PREFIX_KEY+payload.softToken)
    
    return updatedProfile
  }

  return {
    updateNewPassword
  }
}

const _checkErrors = (payload, softTokenContent, dictionary) => {
  if (passwordUtils.checkPasswordRestrict(payload.newPassword) !== true) {
    throw boom('badRequest', dictionary.passwordAlert, errorCode.passwordAlert)
  }
  if (!softTokenContent) {
    throw boom('badRequest', dictionary.softTokenExpired, errorCode.softTokenExpired)
  }
}