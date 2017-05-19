'use Strict';

module.exports = (app) => {
  const friendsServices = app.src.services.friends;
  const addFriendService = friendsServices.addFriendService;
  const searchFriendService = friendsServices.searchFriendService;

  const addFriend = (request, reply) => {
    addFriendService.addFriend(request.payload, request.headers)
      .then((response) => {
        reply(response)
      })
      .catch((err) => reply(err));
  }

  const list = (request, reply) => {
    searchFriendService.list(request.query, request.headers)
      .then((response) => {
        reply(response)
      })
      .catch((err) => reply(err));
  }

  const search = (request, reply) => {
    searchFriendService.search(request.query, request.headers)
      .then((response) => {
        reply(response)
      })
      .catch((err) => reply(err));
  }

  return {
    addFriend,
    list,
    search
  }
}