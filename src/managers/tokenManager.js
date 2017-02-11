'use strict';

const Jwt = require('jsonwebtoken');

module.exports = (app) => {
  const tokenConfig = app.src.config.token;

  const generate = () => Jwt.sign({
    data: 'foobar'
  }, tokenConfig.cert, {
    expiresIn: tokenConfig.expirationTime
  })

  //const isValid = () => 

  return {
    generate
  }
}