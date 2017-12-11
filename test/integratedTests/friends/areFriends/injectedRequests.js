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

const happyPathFriends = {
  method: 'GET',
  url: '/friends/areFriends?userRefFriend=591e5bbba8634f1f9880e8aa',
  headers
}

const happyPathNotFriends = {
  method: 'GET',
  url: '/friends/areFriends?userRefFriend=591e5c2fa8634f1f9880e8b7',
  headers
}


module.exports = {
  happyPathFriends,
  happyPathNotFriends
}

/*eslint camelcase:0 */