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

const updateName = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'name': 'DYNAMICALLY GENERATED'
  },
  headers
}

const updateDescription = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'description': 'DYNAMICALLY GENERATED'
  },
  headers
}

const updateEmail = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'email': 'DYNAMICALLY GENERATED'
  },
  headers
}

const tooLongUserName = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'newUserName': 'tooLongUserNametooLongUserNametooLongUserNametooLongUserName'
  },
  headers
}

const invalidEmail = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'email': 'notAValidEmail'
  },
  headers
}

const userNameAlredyInUse = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'newUserName': 'sergioRamos'
  },
  headers
}

module.exports = {
  updateName,
  updateDescription,
  updateEmail,
  tooLongUserName,
  invalidEmail,
  userNameAlredyInUse
}

/*eslint camelcase:0 */