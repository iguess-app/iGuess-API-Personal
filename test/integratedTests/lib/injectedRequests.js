'use strict'

const headers = {
  request_id: 'integratedTest',
  hardware_fingerprint: 'integratedTest',
  platform: 'Android',
  os_version: '7.0.1',
  app_version: '1.0.0',
  phone_model: 'XT-1792',
  phone_fabricator: 'Motorola'
}

const loginWithEmail = {
  method: 'POST',
  url: '/login/signin',
  payload: {
    login: 'sr4@madrid.com',
    password: 'sergioRamos'
  },
  headers
}

const loginWithProfileToUpdate = {
  method: 'POST',
  url: '/login/signin',
  payload: {
    login: 'profileToUpdate',
    password: 'profileToUpdate'
  },
  headers
}

const loginWithTioValmir = {
  method: 'POST',
  url: '/login/signin',
  payload: {
    login: 'tioValmir',
    password: 'tioValmir'
  },
  headers
}

const loginWithuserNotifi = {
  method: 'POST',
  url: '/login/signin',
  payload: {
    login: 'userNotifi',
    password: 'userNotifi'
  },
  headers
}

const loginWithuserNotifi2 = {
  method: 'POST',
  url: '/login/signin',
  payload: {
    login: 'userNotifi2',
    password: 'userNotifi2'
  },
  headers
}

const signInToDoLogout = {
  method: 'POST',
  url: '/login/signin',
  payload: {
    login: 'sr4@madrid.com',
    password: 'sergioRamos'
  },
  headers
}

module.exports = {
  loginWithEmail,
  loginWithProfileToUpdate,
  loginWithTioValmir,
  loginWithuserNotifi,
  loginWithuserNotifi2,
  signInToDoLogout
}

/*eslint camelcase:0 */