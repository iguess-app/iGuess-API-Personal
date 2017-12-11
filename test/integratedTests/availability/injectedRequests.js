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

const userNamehappyPathUnavailable = {
  method: 'GET',
  url: '/availability/userName?userName=sergioRamos',
  headers
}

const userNamehappyPathAvailable = {
  method: 'GET',
  url: '/availability/userName?userName=naoExiste',
  headers
}

const emailHappyPathUnavailable = {
  method: 'GET',
  url: '/availability/email?email=kross@madrid.com',
  headers
}

const emailHappyPathAvailable = {
  method: 'GET',
  url: '/availability/email?email=kr8s@deutschland.com',
  headers
}

const notEmail = {
  method: 'GET',
  url: '/availability/email?email=kr8s@deutschland',
  headers
}

module.exports = {
  userNamehappyPathAvailable,
  userNamehappyPathUnavailable,
  emailHappyPathUnavailable,
  emailHappyPathAvailable,
  notEmail
}

/*eslint camelcase:0 */