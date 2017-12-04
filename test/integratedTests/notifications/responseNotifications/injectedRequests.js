'use strict'

const sendNotificationBeforeTest = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'userNotifi2'
  },
  headers: {}
}

const listNotificationBeforeTest = {
  method: 'GET',
  url: '/notifications/list',
  headers: {}
}

const happyPathTrue = {
  method: 'PATCH',
  url: '/notifications/response',
  payload: {
    'notificationId': 'SET DYNAMICALLY',
    'accepted': true
  },
  headers: {}
}

const happyPathFalse = {
  method: 'PATCH',
  url: '/notifications/response',
  payload: {
    'notificationId': 'SET DYNAMICALLY',
    'accepted': false
  },
  headers: {}
}

const notFoundNotification = {
  method: 'PATCH',
  url: '/notifications/response',
  payload: {
    'notificationId': '59c9bf289f427d52cc772eea',
    'accepted': false
  },
  headers: {}
}

module.exports = {
  sendNotificationBeforeTest,
  listNotificationBeforeTest,
  happyPathTrue,
  happyPathFalse,
  notFoundNotification
}