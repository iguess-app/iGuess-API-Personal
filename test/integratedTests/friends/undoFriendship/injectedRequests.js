'use strict'

const happyPath = {
  method: 'PUT',
  url: '/friends/undo',
  payload: {
    userName: 'xavi',
    friendUserName: 'sergioRamos'
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