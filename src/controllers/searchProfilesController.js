'use strict'

module.exports = (app) => {

  const searchProfilesServices = app.src.services.searchProfiles;
  const searchProfilesService = searchProfilesServices.searchProfilesService;
  const getProfileService = searchProfilesServices.getProfileService;

  const search = (request, reply) => {
    searchProfilesService.search(request.query, request.headers)
      .then((singUpResponse) => {
        reply(singUpResponse)
      })
      .catch((err) => reply(err));
  }

  const getProfile = (request, reply) => {
    getProfileService.getProfile(request.query, request.headers)
      .then((singUpResponse) => {
        reply(singUpResponse)
      })
      .catch((err) => reply(err));
  }

  return {
    search,
    getProfile
  }
}