'use strict'

const loginWithEmail = {
  method: 'POST',
  url: '/login/singin',
  payload: {
    login: 'sr4@madrid.com',
    password: 'sergioRamos'
  }
}

module.exports = {
  loginWithEmail
}