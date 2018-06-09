'use strict'

const coincidents = require('iguess-api-coincidents')
const sgMail = require('@sendgrid/mail') //https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail

const config = require('../../../config')
const { generateToken, cipheringEmail } = require('./functions')
const commonData = require('./commonData')
const getProfileByEmailOrUsernameRepository = require('../../repositories/searchProfiles/getProfileByEmailOrUsernameRepository')()
const cacheManager = coincidents.Managers.cacheManager

const TIME_TO_EXPIRE_TOKEN = 900 //15min

sgMail.setApiKey(config.sendGrid.apiKey)

module.exports = () => {
  const sendEmail = async (payload, headers) => {
    const dictionary = coincidents.Translate.gate.selectLanguage(headers.language)
    const emailObj = await getProfileByEmailOrUsernameRepository(payload, dictionary)
    const token = await generateToken()()
    const emailMsg = _buildEmailObj(emailObj, token)
    
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

const _buildEmailObj = (emailObj, token) => {
  const emailMsg = {
    to: emailObj.email,
    from: config.sendGrid.emailFrom,
    subject: 'Parece que esqueceu seu senha né!?',
    text: 'Seu token está aqui',
    html: `Tudo bem, a gente te ajuda! Esse é seu token: ${token}. Copia o token volta lá no app e reseta a senha o/`
  }

  return emailMsg
}

//TODO: add english and portuguese email according to the req