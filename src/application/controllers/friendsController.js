'use Strict';

module.exports = (app) => {

  const friendsService = app.src.application.services.friendsService;

  const search = (request, reply) => {
    friendsService.search(request.query, request.headers)
      .then((singUpResponse) => {
        reply(singUpResponse)
      })
      .catch((err) => reply(err));
  }

  return {
    search
  }
}