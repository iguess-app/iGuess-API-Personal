'use strict'

const Promise = require('bluebird')

module.exports = (app) => {
  const Profile = app.src.models.profileModel;

  const search = (payload) => {
    const searchQuery = {
      userName: payload.userName
    }
    const projectionQuery = {
      'friendList': 1,
      '_id': 0
    }

    return Profile.findOne(searchQuery, projectionQuery)
      .then((user) => _getFriendByID(user))
      .then((friendsUserNameArray) => _findUserText(friendsUserNameArray, payload.searchField))
  }

  const list = (payload) => {
    const searchQuery = {
      userName: payload.userName
    }
    const projectionQuery = {
      'friendList': 1,
      '_id': 0
    }

    return Profile.findOne(searchQuery, projectionQuery)
      .then((user) => _getFriendByID(user))
  }

  const _getFriendByID = (user) => {
    const projectionQuery = {
      'userName': 1,
      'avatar': 1,
      '_id': 1
    }
    const friendsUserNamePromiseArray = user.friendList.map((friendId) =>
      Profile.findById(friendId, projectionQuery)
      .then((friend) => ({
        'userName': friend.userName,
        'avatar': friend.avatar,
        'userId': friend.id
      }))
    )

    return Promise.map(friendsUserNamePromiseArray, (friendObj) =>
      friendObj
    )

  }

  const _findUserText = (friends, searchField) =>
    friends.filter((friend) => 
      friend.userName.toLowerCase().includes(searchField.toLowerCase())
    )

  return {
    search,
    list
  }
}
