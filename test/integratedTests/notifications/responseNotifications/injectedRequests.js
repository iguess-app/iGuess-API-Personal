'use strict'

const sendNotificationBeforeTest = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'userName': 'userNotifi',
    'invitedUserName': 'userNotifi2'
  }
}

const listNotificationBeforeTest = {
  method: 'GET',
  url: '/notifications/list?userRef=5a189e34d7b55e03544887f8'
}

const happyPathTrue = {
  method: 'PATCH',
  url: '/notifications/response',
  payload: {
    'userRef': '5a189e34d7b55e03544887f8',
    'notificationId': 'SET DYNAMICALLY',
    'accepted': true
  }
}

const happyPathFalse = {
  method: 'PATCH',
  url: '/notifications/response',
  payload: {
    'userRef': '5a189e34d7b55e03544887f8',
    'notificationId': '59c9bf289f427d52cc772eea',
    'accepted': false
  }
}

const notFoundNotification = {
  method: 'PATCH',
  url: '/notifications/response',
  payload: {
    'userRef': '591df6c78d1fdc0bb4eba371',
    'notificationId': '59c9bf289f427d52cc772eea',
    'accepted': false
  }
}

module.exports = {
  sendNotificationBeforeTest,
  listNotificationBeforeTest,
  happyPathTrue,
  happyPathFalse,
  notFoundNotification
}