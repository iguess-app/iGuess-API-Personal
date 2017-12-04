'use strict'

const happyPathFriends = {
  method: 'GET',
  url: '/friends/areFriends?userRefFriend=591e5c2fa8634f1f9880e8b6',
  headers: {}
}

const happyPathNotFriends = {
  method: 'GET',
  url: '/friends/areFriends?userRefFriend=591e5c2fa8634f1f9880e8b7',
  headers: {}
}


module.exports = {
  happyPathFriends,
  happyPathNotFriends
}