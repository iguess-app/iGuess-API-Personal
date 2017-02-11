'use Strict';

module.exports = (app) => {
  const tokenRepository = app.src.application.repositories.tokenRepository;

  const verify = (payload) => tokenRepository.verify(payload)

  return {
    verify
  }
};