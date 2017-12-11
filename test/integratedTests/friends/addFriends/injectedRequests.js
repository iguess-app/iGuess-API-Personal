'use strict'

const happyPath = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'gabrielJesus'
  },
  headers: {
    request_id: 'postmanRequest',
    hardware_fingerprint: 'postmanRequest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

const userNotFound = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'userThatNeverSignUp'
  },
  headers: {
    request_id: 'postmanRequest',
    hardware_fingerprint: 'postmanRequest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

const notificationAlreadySent = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'gabrielJesus'
  },
  headers: {
    request_id: 'postmanRequest',
    hardware_fingerprint: 'postmanRequest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

const alreadyFriends = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'cristianoRonaldo'
  },
  headers: {
    request_id: 'postmanRequest',
    hardware_fingerprint: 'postmanRequest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

module.exports = {
  happyPath,
  userNotFound,
  notificationAlreadySent,
  alreadyFriends
}

/*eslint camelcase:0 */