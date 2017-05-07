'use Strict';

module.exports = (app) => {
  const availabilityUserNameRepository = app.src.repositories.availability.availabilityUserNameRepository;

  const userNameAvailability = (request, headers) => availabilityUserNameRepository.userNameAvailability(request, headers)

  return {
    userNameAvailability
  }
};