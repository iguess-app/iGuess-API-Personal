'use strict'

const happyPath = {
  method: 'PUT',
  url: '/friends/undo',
  payload: {
    userName: 'fernandinho',
    friendUserName: 'kunAguero'
  }
}

const usersNotFriends = {
  method: 'PUT',
  url: '/friends/undo',
  payload: {
    userName: 'messi',
    friendUserName: 'sergioRamos'
  }
}


module.exports = {
  happyPath,
  usersNotFriends
}