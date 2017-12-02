'use strict'

const updateName = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'name': 'DYNAMICALLY GENERATED'
  },
  headers: {}
}

const updateDescription = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'description': 'DYNAMICALLY GENERATED'
  },
  headers: {}
}

const updateEmail = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'email': 'DYNAMICALLY GENERATED'
  },
  headers: {}
}

const tooLongUserName = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'newUserName': 'tooLongUserNametooLongUserNametooLongUserNametooLongUserName'
  },
  headers: {}
}

const invalidEmail = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'email': 'notAValidEmail'
  },
  headers: {}
}

const userNameAlredyInUse = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'newUserName': 'sergioRamos'
  },
  headers: {}
}

module.exports = {
  updateName,
  updateDescription,
  updateEmail,
  tooLongUserName,
  invalidEmail,
  userNameAlredyInUse
}