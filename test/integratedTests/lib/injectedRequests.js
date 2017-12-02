'use strict'

const loginWithEmail = {
  method: 'POST',
  url: '/login/singin',
  payload: {
    login: 'sr4@madrid.com',
    password: 'sergioRamos'
  }
}

const loginWithProfileToUpdate = {
  method: 'POST',
  url: '/login/singin',
  payload: {
    login: 'profileToUpdate',
    password: 'profileToUpdate'
  }
}

module.exports = {
  loginWithEmail,
  loginWithProfileToUpdate
}