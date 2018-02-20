'use strict'

module.exports = (app) => {
  const loginServices = app.src.services.login
  const signInService = loginServices.signInService
  const signUpService = loginServices.signUpService
  const logoutService = loginServices.logoutService
  const StatusUtils = app.coincidents.Utils.statusUtils

  const singUp = (request, reply) => {
    signUpService.singUp(request.payload, request.headers)
      .then((singUpResponse) => reply(singUpResponse).code(StatusUtils.created))
      .catch((err) => reply(err))
  }

  const singIn = (request, reply) => {
    signInService.singIn(request.payload, request.headers)
      .then((singInResponse) => reply(singInResponse))
      .catch((err) => reply(err))
  }

  const logout = (request, reply) => {
    logoutService.logout(request.payload, request.headers)
      .then((logoutResponse) => reply(logoutResponse))
      .catch((err) => reply(err))
  }

  return {
    singUp,
    singIn,
    logout
  }
}