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

const happyPathWithUserRef = {
  method: 'GET',
  url: '/profiles/getProfile?userRef=591df6c78d1fdc0bb4eba371',
  headers
}

const happyPathWithUserName = {
  method: 'GET',
  url: '/profiles/getProfile?userName=sergioRamos',
  headers
}

const happyPathWithSelf = {
  method: 'GET',
  url: '/profiles/getProfile?self=true',
  headers
}

const notFound = {
  method: 'GET',
  url: '/profiles/getProfile?userRef=591df6c78d1fdc0bb4ebaaaa',
  headers
}

module.exports = {
  happyPathWithUserRef,
  happyPathWithUserName,
  happyPathWithSelf,
  notFound
}

/*eslint camelcase:0 */