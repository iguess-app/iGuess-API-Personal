'use strict'

const happyPath = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'gabrielJesus'
  },
  headers: {}
}

const userNotFound = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'userThatNeverSignUp'
  },
  headers: {}
}

const notificationAlreadySent = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'gabrielJesus'
  },
  headers: {}
}

const alreadyFriends = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'invitedUserName': 'cristianoRonaldo'
  },
  headers: {}
}

module.exports = {
  happyPath,
  userNotFound,
  notificationAlreadySent,
  alreadyFriends
}