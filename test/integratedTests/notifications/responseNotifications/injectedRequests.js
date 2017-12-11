'use strict'

const headers = {
  request_id: 'postmanRequest',
  hardware_fingerprint: 'postmanRequest',
  platform: 'Android',
  os_version: '7.0.1',
  app_version: '1.0.0',
  phone_model: 'XT-1792',
  phone_fabricator: 'Motorola'
}

const sendNotificationBeforeTest = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'userNotifi2'
  },
  headers
}

const listNotificationBeforeTest = {
  method: 'GET',
  url: '/notifications/list',
  headers
}

const happyPathTrue = {
  method: 'PATCH',
  url: '/notifications/response',
  payload: {
    'notificationId': 'SET DYNAMICALLY',
    'accepted': true
  },
  headers
}

const happyPathFalse = {
  method: 'PATCH',
  url: '/notifications/response',
  payload: {
    'notificationId': 'SET DYNAMICALLY',
    'accepted': false
  },
  headers
}

const notFoundNotification = {
  method: 'PATCH',
  url: '/notifications/response',
  payload: {
    'notificationId': '59c9bf289f427d52cc772eea',
    'accepted': false
  },
  headers
}

module.exports = {
  sendNotificationBeforeTest,
  listNotificationBeforeTest,
  happyPathTrue,
  happyPathFalse,
  notFoundNotification
}

/*eslint camelcase:0 */