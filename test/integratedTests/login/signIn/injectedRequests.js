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

const loginWithUserName = {
  method: 'POST',
  url: '/login/signin',
  payload: {
    login: 'toniKross',
    password: 'toniKross'
  },
  headers
}

const invalidLogin = {
  method: 'POST',
  url: '/login/signin',
  payload: {
    login: 'homeeeeee',
    password: 'invalidPass'
  },
  headers
}

module.exports = {
  loginWithEmail,
  loginWithUserName,
  invalidLogin
}

/*eslint camelcase:0 */