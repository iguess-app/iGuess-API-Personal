'use strict'

module.exports = (app) => {
  const sendEmailService = app.src.services.forgotMyPass.sendEmailService

  const sendEmail = (request, reply) => {
    sendEmailService.sendEmail(request.payload, request.headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  return {
    sendEmail
  }
}