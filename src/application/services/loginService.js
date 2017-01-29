'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const loginRepository = app.src.application.repositories.loginRepository;
  const PasswordUtils = app.src.utils.passwordUtils;

  const singUp = (payload) => {
    PasswordUtils.checkPasswordRestrict(payload.password)
    .then(() => PasswordUtils.cryptPassword(payload.password))
    .then(() => loginRepository.singUp(payload))
    .catch((err) => Boom.badData(err))
  }
  
  return { singUp }
};