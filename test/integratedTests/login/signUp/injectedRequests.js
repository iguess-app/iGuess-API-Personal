'use strict'

const happyPath = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'ancelotti',
    'password': 'ancelotti',
    'email': 'ancelotti@gmail.com'
  }
}

const emailAlreadyExists = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'mcRodolfinho',
    'password': 'mcRodolfinho',
    'email': 'mcRodolfinho@gmail.com'
  }
}

const userNameAlreadyExists = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'mcRodolfinh',
    'password': 'mcRodolfinho',
    'email': 'mcRodolfinho@gmail.com'
  }
}

const notAemail = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'mcRodolfinho',
    'password': 'mcRodolfinho',
    'email': 'mcRodolfinho@gmailcom'
  }
}

const passwordTooWeak = {
  method: 'POST',
  url: '/login/signup',
  payload: {
    'userName': 'mcRodolfinho',
    'password': 'mcRodolfinho',
    'email': 'mcRodolfinho@gmail.com'
  }
}

module.exports = {
  happyPath,
  emailAlreadyExists,
  userNameAlreadyExists,
  passwordTooWeak,
  notAemail
}