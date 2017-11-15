'use strict'

const happyPathFriends = {
  method: 'GET',
  url: '/friends/areFriends?userRef=59bddea6e7c8a12658c0c08a&userRefFriend=59b54e44a7631d433470fee7'
}

const happyPathNotFriends = {
  method: 'GET',
  url: '/friends/areFriends?userRef=59bddea6e7c8a12658c0c08a&userRefFriend=59b54e44a7631d433470fee8'
}


module.exports = {
  happyPathFriends,
  happyPathNotFriends
}