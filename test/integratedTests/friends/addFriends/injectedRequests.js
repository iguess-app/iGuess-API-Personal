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
  url: '/friends/add',
  payload: {
    'invitedUserName': 'gabrielJesus'
  },
  headers
}

const userNotFound = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'userThatNeverSignUp'
  },
  headers
}

const notificationAlreadySent = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'gabrielJesus'
  },
  headers
}

const alreadyFriends = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'cristianoRonaldo'
  },
  headers
}

module.exports = {
  happyPath,
  userNotFound,
  notificationAlreadySent,
  alreadyFriends
}

/*eslint camelcase:0 */