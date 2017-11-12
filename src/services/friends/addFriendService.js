'use strict'

module.exports = (app) => {
  const addFriendRepository = app.src.repositories.friends.addFriendRepository;

  const addFriend = (request, headers) => addFriendRepository.addFriend(request, headers)

  return {
    addFriend
  }
};