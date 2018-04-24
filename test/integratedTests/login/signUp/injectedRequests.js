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

const happyPath = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'ancelotti',
    'name': 'ancelotti',
    'password': 'ancelotti',
    'email': 'ancelotti@gmail.com'
  },
  headers
}

const emailAlreadyExists = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'mcRodolfinho',
    'name': 'mcRodolfinho',
    'password': 'mcRodolfinho',
    'email': 'mcRodolfinho@gmail.com'
  },
  headers
}

const userNameAlreadyExists = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'mcRodolfinh',
    'name': 'mcRodolfinh',
    'password': 'mcRodolfinho',
    'email': 'mcRodolfinho@gmail.com'
  },
  headers
}

const notAemail = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'mcRodolfinho',
    'name': 'mcRodolfinho',
    'password': 'mcRodolfinho',
    'email': 'mcRodolfinho@gmailcom'
  },
  headers
}

const passwordTooWeak = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'mcRodolfinho',
    'name': 'mcRodolfinho',
    'password': 'mcRodolfinho',
    'email': 'mcRodolfinho@gmail.com'
  },
  headers
}

module.exports = {
  happyPath,
  emailAlreadyExists,
  userNameAlreadyExists,
  passwordTooWeak,
  notAemail
}

/*eslint camelcase:0 */