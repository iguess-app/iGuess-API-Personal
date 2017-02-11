'use strict';

const Jwt = require('jsonwebtoken');

module.exports = (app) => {
  const expirationTime = 3600; //1hour (in Seconds)
  const cert = app.src.config.tokenCert;

  const generate = () => Jwt.sign({
    data: 'foobar'
  }, cert, {
    expiresIn: expirationTime
  })

  //const isValid = () => 

  return {
    generate
  }
}