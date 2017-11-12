'use strict'

const Promise = require('bluebird')

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const search = (payload) => {
    const searchQuery = _getSearchQuery(payload.userName)

    return Profile.findOne(searchQuery, _getProjetionQuery())
      .then((user) => _getFriendByID(user))
      .then((friendsUserNameArray) => _findUserText(friendsUserNameArray, payload.searchField))
  }

  const list = (payload) => {
    const searchQuery = _getSearchQuery(payload.userName)

    return Profile.findOne(searchQuery, _getProjetionQuery())
      .then((user) => _getFriendByID(user))
  }

  const _getFriendByID = (user) => {
    const projectionQuery = {
      userName: 1,
      avatar: 1,
      _id: 1
    }
    const friendsUserNamePromiseArray = user.friendList.map((friendId) =>
      Profile.findById(friendId, projectionQuery)
      .then((friend) => ({
        userName: friend.userName,
        avatar: friend.avatar,
        userRef: friend.id
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


const _getProjetionQuery = () => ({
    friendList: 1,
    _id: 0
})

const _getSearchQuery = (userName) => ({ userName })