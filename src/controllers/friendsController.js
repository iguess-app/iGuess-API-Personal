'use Strict';

module.exports = (app) => {
  const friendsServices = app.src.services.friends;
  const addFriendService = friendsServices.addFriendService;
  const responseInviteService = friendsServices.responseInviteService;

  const addFriend = (request, reply) => {
    addFriendService.addFriend(request.payload, request.headers)
      .then((addFriendResponse) => {
        reply(addFriendResponse)
      })
      .catch((err) => reply(err));
  }

  const responseInvite = (request, reply) => {
    responseInviteService.responseInvite(request.payload, request.headers)
      .then((inviteResponse) => {
        reply(inviteResponse)
      })
      .catch((err) => 
        reply(err)
      );
  }

  return {
    addFriend,
    responseInvite
  }
}