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

const loginWithuserNotifi2 = {
  method: 'POST',
  url: '/login/singin',
  payload: {
    login: 'userNotifi2',
    password: 'userNotifi2'
  }
}

module.exports = {
  loginWithEmail,
  loginWithProfileToUpdate,
  loginWithTioValmir,
  loginWithuserNotifi,
  loginWithuserNotifi2
}