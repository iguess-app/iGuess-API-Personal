'use strict'

const happyPath = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'userName': 'tioValmir',
    'invitedUserName': 'gabrielJesus'
  }
}

const userNotFound = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'userName': 'tioValmir',
    'invitedUserName': 'userThatNeverSignUp'
  }
}

const notificationAlreadySent = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'userName': 'tioValmir',
    'invitedUserName': 'gabrielJesus'
  }
}

const alreadyFriends = {
  method: 'POST',
  url: '/friends/add',
  payload: {
    'userName': 'sergioRamos',
    'invitedUserName': 'cristianoRonaldo'
  }
}

module.exports = {
  happyPath,
  userNotFound,
  notificationAlreadySent,
  alreadyFriends
}