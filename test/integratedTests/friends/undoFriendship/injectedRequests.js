'use strict'

const headers = {
  request_id: 'integratedTest',
  hardware_fingerprint: 'integratedTest',
  platform: 'Android',
  os_version: '7.0.1',
  app_version: '1.0.0',
  phone_model: 'XT-1792',
  phone_fabricator: 'Motorola'
}

const happyPath = {
  method: 'DELETE',
  url: '/friends/undo',
  payload: {
    friendUserName: 'fernandoTorres'
  },
  headers
}

const usersNotFriends = {
  method: 'DELETE',
  url: '/friends/undo',
  payload: {
    friendUserName: 'messi'
  },
  headers
}

module.exports = {
  happyPath,
  usersNotFriends
}

/*eslint camelcase:0 */