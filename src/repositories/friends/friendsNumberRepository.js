'use strict'

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const getNumberOfFriends = (userName) => {

    const searchQuery = {
      userName
    }

    const projectionQuery = {
      'friendList': 1,
      '_id': 0
    }

    return Profile.findOne(searchQuery, projectionQuery)
      .then((user) => user.friendList.length)
      .catch((err) => err)
  }

  return {
    getNumberOfFriends
  }
}