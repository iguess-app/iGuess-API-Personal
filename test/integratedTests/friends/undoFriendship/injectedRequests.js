'use strict'

const happyPath = {
  method: 'DELETE',
  url: '/friends/undo',
  payload: {
    friendUserName: 'fernandoTorres'
  },
  headers: {}
}

const usersNotFriends = {
  method: 'DELETE',
  url: '/friends/undo',
  payload: {
    friendUserName: 'messi'
  },
  headers: {}
}


module.exports = {
  happyPath,
  usersNotFriends
}