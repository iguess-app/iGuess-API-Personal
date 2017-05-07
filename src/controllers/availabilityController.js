'use Strict';

module.exports = (app) => {

  const availabilityUserNameService = app.src.services.availability.availabilityUserNameService;

  const userNameAvailability = (request, reply) => {
    availabilityUserNameService.userNameAvailability(request.query, request.headers)
      .then((response) => reply(response))
      .catch((err) => reply(err));
  }

  return {
    userNameAvailability
  }
}