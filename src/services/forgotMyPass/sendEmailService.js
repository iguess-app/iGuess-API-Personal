'use strict'

const fs = require('fs')
const path = require('path')
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
    const emailMsg = await _buildEmailObj(emailObj, token, dictionary)
    
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

const _buildEmailObj = async (emailObj, token, dictionary) => {
  const emailMsg = {
    to: emailObj.email,
    from: config.sendGrid.emailFrom,
    subject: dictionary.forgotMyPassSubject,
    text: 'z',
    html: await _getEmailHtml(emailObj, token, dictionary)
  }
  
  return emailMsg
}

const _getEmailHtml = (emailObj, token, dictionary) =>
  new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'html/index.html'), 'utf-8', (err, htmlFile) => {
      if (err) {
        return reject(err)
      }
      const descriptionWithUserName = dictionary.descriptionPart1.replace('{{userName}}', emailObj.userName)
  
      const htmlTranslated = htmlFile
        .replace('{{titleH1}}', dictionary.titleH1)
        .replace('{{descriptionPart1}}', descriptionWithUserName)
        .replace('{{descriptionHighLight}}', dictionary.descriptionHighLight)
        .replace('{{descriptionPart2}}', dictionary.descriptionPart2)
        .replace('{{yourTokenIs}}', dictionary.yourTokenIs)
        .replace('{{afterToken}}', dictionary.afterToken)
        .replace('{{afterTokenHighLight}}', dictionary.afterTokenHighLight)
        .replace('{{doubtsBottom}}', dictionary.doubtsBottom)
        .replace('{{talkWithUsBottom}}', dictionary.talkWithUsBottom)
        .replace('{{token}}', token)
  
      return resolve(htmlTranslated)
    })
  })