'use strict'

const coincidents = require('iguess-api-coincidents')
const sgMail = require('@sendgrid/mail') //https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail

const config = require('../../../config')
const { generateToken, cipheringEmail } = require('./functions')
const commonData = require('./commonData')
const getProfileByEmailOrUsernameRepository = require('../../repositories/searchProfiles/getProfileByEmailOrUsernameRepository')()
const cacheManager = coincidents.Managers.cacheManager

const TIME_TO_EXPIRE_TOKEN = 1800 //30min

sgMail.setApiKey(config.sendGrid.apiKey)

module.exports = () => {
  const sendEmail = async (payload, headers) => {
    const dictionary = coincidents.Translate.gate.selectLanguage(headers.language)
    const emailObj = await getProfileByEmailOrUsernameRepository(payload, dictionary)
    const token = await generateToken()()
    const emailMsg = _buildEmailObj(emailObj, token, dictionary)
    
    cacheManager.set(commonData.REDIS_PREFIX_KEY+token, emailObj, TIME_TO_EXPIRE_TOKEN)
    sgMail.send(emailMsg)

    const emailHiddened = cipheringEmail()(emailObj.email)

    return {
      sent: true,
      emailHiddened
    }
  }

  return {
    sendEmail
  }
}

const _buildEmailObj = (emailObj, token, dictionary) => {
  const emailMsg = {
    to: emailObj.email,
    from: config.sendGrid.emailFrom,
    subject: dictionary.forgotMyPassSubject,
    text: 'z',
    html: dictionary.forgotMyPassBody.replace('{{token}}', token)
  }
  
  return emailMsg
}