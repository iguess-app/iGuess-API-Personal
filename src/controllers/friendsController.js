'use Strict';

module.exports = (app) => {
  const friendsServices = app.src.services.friends;
  const addFriendService = friendsServices.addFriendService;

  const addFriend = (request, reply) => {
    addFriendService.addFriend(request.payload, request.headers)
      .then((addFriendResponse) => {
        reply(addFriendResponse)
      })
      .catch((err) => reply(err));
  }

  return {
    addFriend
  }
}