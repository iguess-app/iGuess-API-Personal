'use strict'

const updateName = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'userName': 'profileToUpdate',
    'name': 'DYNAMICALLY GENERATED'
  }
}

const updateDescription = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'userName': 'profileToUpdate',
    'description': 'DYNAMICALLY GENERATED'
  }
}

const updateEmail = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'userName': 'profileToUpdate',
    'email': 'DYNAMICALLY GENERATED'
  }
}

const tooLongUserName = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'userName': 'profileToUpdate',
    'newUserName': 'tooLongUserNametooLongUserNametooLongUserNametooLongUserName'
  }
}

const invalidEmail = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'userName': 'profileToUpdate',
    'email': 'notAValidEmail'
  }
}

const userNameAlredyInUse = {
  method: 'PATCH',
  url: '/profile/updateInfo',
  payload: {
    'userName': 'profileToUpdate',
    'newUserName': 'sergioRamos'
  }
}

module.exports = {
  updateName,
  updateDescription,
  updateEmail,
  tooLongUserName,
  invalidEmail,
  userNameAlredyInUse
}