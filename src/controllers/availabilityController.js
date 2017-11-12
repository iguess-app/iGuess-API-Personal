'use strict'

module.exports = (app) => {

  const availabilityUserNameService = app.src.services.availability.availabilityUserNameService;
  const availabilityEmailService = app.src.services.availability.availabilityEmailService;

  const userNameAvailability = (request, reply) => {
    availabilityUserNameService.userNameAvailability(request.query, request.headers)
      .then((response) => reply(response))
      .catch((err) => reply(err));
  }

  const emailAvailability = (request, reply) => {
    availabilityEmailService.emailAvailability(request.query, request.headers)
      .then((response) => reply(response))
      .catch((err) => reply(err));
  }

  return {
    userNameAvailability,
    emailAvailability
  }
}