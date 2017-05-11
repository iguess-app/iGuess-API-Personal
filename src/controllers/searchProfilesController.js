'use Strict';

module.exports = (app) => {

  const searchProfilesService = app.src.services.searchProfilesService;

  const search = (request, reply) => {
    searchProfilesService.search(request.query, request.headers)
      .then((singUpResponse) => {
        reply(singUpResponse)
      })
      .catch((err) => reply(err));
  }

  return {
    search
  }
}