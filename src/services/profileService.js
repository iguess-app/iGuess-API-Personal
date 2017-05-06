'use Strict';

module.exports = (app) => {
  const profileRepository = app.src.repositories.profileRepository;

  const update = (payload, headers) => profileRepository.update(payload, headers)

  return {
    update
  }
}