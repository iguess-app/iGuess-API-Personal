'use strict'

module.exports = (app) => {
  const sendEmailService = app.src.services.forgotMyPass.sendEmailService
  const validateSoftTokenService = app.src.services.forgotMyPass.validateSoftTokenService
  const updateNewPasswordService = app.src.services.forgotMyPass.updateNewPasswordService

  const sendEmail = (request, reply) => {
    sendEmailService.sendEmail(request.payload, request.headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const validateSoftToken = (request, reply) => {
    validateSoftTokenService.validateSoftToken(request.query, request.headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const updateNewPassword = (request, reply) => {
    updateNewPasswordService.updateNewPassword(request.payload, request.headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  return {
    sendEmail,
    validateSoftToken,
    updateNewPassword
  }
}