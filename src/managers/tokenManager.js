'use strict';

const Jwt = require('jsonwebtoken');

module.exports = (app) => {
  const tokenConfig = app.src.config.token;

  const generate = () => Jwt.sign({
    validate: true
  }, tokenConfig.cert, {
    expiresIn: tokenConfig.expirationTime
  })

  const isValid = (token) => Jwt.verify(token, tokenConfig.cert)

  return {
    generate,
    isValid
  }
}