'use strict'

const loginWithEmail = {
  method: 'POST',
  url: '/login/singin',
  payload: {
    login: 'sr4@madrid.com',
    password: 'sergioRamos'
  }
}

const loginWithUserName = {
  method: 'POST',
  url: '/login/singin',
  payload: {
    login: 'toniKross',
    password: 'toniKross'
  }
}

const invalidLogin = {
  method: 'POST',
  url: '/login/singin',
  payload: {
    login: 'homeeeeee',
    password: 'invalidPass'
  }
}

module.exports = {
  loginWithEmail,
  loginWithUserName,
  invalidLogin
}