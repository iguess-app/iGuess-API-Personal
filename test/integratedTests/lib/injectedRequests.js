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

const loginWithTioValmir = {
  method: 'POST',
  url: '/login/singin',
  payload: {
    login: 'tioValmir',
    password: 'tioValmir'
  }
}

const loginWithuserNotifi = {
  method: 'POST',
  url: '/login/singin',
  payload: {
    login: 'userNotifi',
    password: 'userNotifi'
  }
}

module.exports = {
  loginWithEmail,
  loginWithProfileToUpdate,
  loginWithTioValmir,
  loginWithuserNotifi
}